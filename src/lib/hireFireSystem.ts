import { supabase } from './supabaseClient';

export interface HireEmployeeParams {
  userId: string;
  roleId: string;
  personaId: string;
  tier: string;
  amount: number;
}

export interface FireEmployeeParams {
  userId: string;
  accountRoleId: string;
  reason?: string;
}

export interface LockInStatus {
  canFire: boolean;
  daysRemaining: number;
  lockInExpiry: string | null;
}

/**
 * Check if an employee can be fired (30-day lock-in expired)
 */
export async function checkLockInStatus(accountRoleId: string): Promise<LockInStatus> {
  const { data, error } = await supabase
    .from('account_roles')
    .select('lock_in_expiry, hired_at')
    .eq('id', accountRoleId)
    .eq('status', 'active')
    .single();

  if (error || !data) {
    return {
      canFire: false,
      daysRemaining: 30,
      lockInExpiry: null,
    };
  }

  const lockInExpiry = data.lock_in_expiry;
  if (!lockInExpiry) {
    return {
      canFire: false,
      daysRemaining: 30,
      lockInExpiry: null,
    };
  }

  const now = new Date();
  const expiryDate = new Date(lockInExpiry);
  const canFire = now >= expiryDate;
  
  const daysRemaining = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return {
    canFire,
    daysRemaining: Math.max(0, daysRemaining),
    lockInExpiry,
  };
}

/**
 * Get all hired employees for a user with their lock-in status
 */
export async function getHiredEmployees(userId: string) {
  const { data, error } = await supabase
    .from('account_roles')
    .select(`
      id,
      role_id,
      persona_id,
      status,
      hired_at,
      lock_in_expiry,
      roles (
        display_name,
        department,
        authority_tier,
        description
      ),
      role_personas (
        persona_name,
        gender,
        avatar_url
      )
    `)
    .eq('account_id', userId)
    .eq('status', 'active')
    .order('hired_at', { ascending: false });

  if (error) {
    console.error('Error fetching hired employees:', error);
    return [];
  }

  // Add lock-in status to each employee
  const employeesWithStatus = await Promise.all(
    (data || []).map(async (employee) => {
      const lockInStatus = await checkLockInStatus(employee.id);
      return {
        ...employee,
        lockInStatus,
      };
    })
  );

  return employeesWithStatus;
}

/**
 * Hire an employee (should be called after successful Stripe payment)
 */
export async function hireEmployee(params: HireEmployeeParams) {
  const { userId, roleId, personaId, tier, amount } = params;

  try {
    // Check if already hired
    const { data: existing } = await supabase
      .from('account_roles')
      .select('id')
      .eq('account_id', userId)
      .eq('role_id', roleId)
      .eq('status', 'active')
      .single();

    if (existing) {
      throw new Error('Employee already hired');
    }

    // Create account_role record
    const { data: accountRole, error: accountRoleError } = await supabase
      .from('account_roles')
      .insert({
        account_id: userId,
        role_id: roleId,
        persona_id: personaId,
        status: 'active',
        hired_by_user_id: userId,
        hired_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (accountRoleError) {
      throw accountRoleError;
    }

    // Create subscription record (if not exists)
    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        status: 'active',
        tier,
        amount,
        billing_cycle: 'monthly',
        next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });

    if (subscriptionError) {
      console.error('Error creating subscription:', subscriptionError);
    }

    return {
      success: true,
      accountRoleId: accountRole.id,
      lockInExpiry: accountRole.lock_in_expiry,
    };
  } catch (error) {
    console.error('Error hiring employee:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to hire employee',
    };
  }
}

/**
 * Fire an employee (with 30-day lock-in validation)
 */
export async function fireEmployee(params: FireEmployeeParams) {
  const { userId, accountRoleId, reason } = params;

  try {
    // Check lock-in status
    const lockInStatus = await checkLockInStatus(accountRoleId);
    
    if (!lockInStatus.canFire) {
      throw new Error(`Cannot fire employee. Lock-in period expires in ${lockInStatus.daysRemaining} days.`);
    }

    // Get account_role details for audit log
    const { data: accountRole, error: fetchError } = await supabase
      .from('account_roles')
      .select('*')
      .eq('id', accountRoleId)
      .eq('account_id', userId)
      .eq('status', 'active')
      .single();

    if (fetchError || !accountRole) {
      throw new Error('Employee not found or already fired');
    }

    // Update account_role status to 'fired'
    const { error: updateError } = await supabase
      .from('account_roles')
      .update({
        status: 'fired',
        fired_at: new Date().toISOString(),
        fired_by_user_id: userId,
      })
      .eq('id', accountRoleId);

    if (updateError) {
      throw updateError;
    }

    // Create audit log entry
    const { error: logError } = await supabase
      .from('fired_employees_log')
      .insert({
        account_role_id: accountRoleId,
        user_id: userId,
        role_id: accountRole.role_id,
        persona_id: accountRole.persona_id,
        hired_at: accountRole.hired_at,
        fired_at: new Date().toISOString(),
        lock_in_expired: true,
        reason: reason || 'No reason provided',
        metadata: {
          lock_in_expiry: accountRole.lock_in_expiry,
        },
      });

    if (logError) {
      console.error('Error creating fired employee log:', logError);
    }

    return {
      success: true,
      message: 'Employee fired successfully',
    };
  } catch (error) {
    console.error('Error firing employee:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fire employee',
    };
  }
}

/**
 * Get user's active subscriptions
 */
export async function getUserSubscriptions(userId: string) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .in('status', ['active', 'trialing'])
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching subscriptions:', error);
    return [];
  }

  return data || [];
}

/**
 * Get payment history for a user
 */
export async function getPaymentHistory(userId: string, limit = 50) {
  const { data, error } = await supabase
    .from('payment_events')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching payment history:', error);
    return [];
  }

  return data || [];
}

/**
 * Get fired employees history for a user
 */
export async function getFiredEmployeesHistory(userId: string) {
  const { data, error } = await supabase
    .from('fired_employees_log')
    .select('*')
    .eq('user_id', userId)
    .order('fired_at', { ascending: false });

  if (error) {
    console.error('Error fetching fired employees:', error);
    return [];
  }

  return data || [];
}
