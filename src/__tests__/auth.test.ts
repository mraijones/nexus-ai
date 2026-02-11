import { describe, it, expect, beforeEach, vi } from 'vitest';

const fromMock = vi.fn();
const selectMock = vi.fn();
const eqMock = vi.fn();
const singleMock = vi.fn();

vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    from: (...args: unknown[]) => fromMock(...args),
  },
}));

import { fetchUserProfile } from '../lib/auth';

describe('fetchUserProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    fromMock.mockReturnValue({
      select: selectMock.mockImplementation(() => ({
        eq: eqMock.mockImplementation(() => ({
          single: singleMock,
        })),
      })),
    });
  });

  it('returns profile data when found', async () => {
    singleMock.mockResolvedValue({
      data: { id: 'user-1', full_name: 'Test User', subscription_tier: 'starter', company: 'Acme' },
      error: null,
    });

    const profile = await fetchUserProfile('user-1');

    expect(fromMock).toHaveBeenCalledWith('profiles');
    expect(selectMock).toHaveBeenCalledWith('id, full_name, subscription_tier, company');
    expect(eqMock).toHaveBeenCalledWith('id', 'user-1');
    expect(profile).toEqual({ id: 'user-1', full_name: 'Test User', subscription_tier: 'starter', company: 'Acme' });
  });

  it('returns null and logs when there is an error', async () => {
    singleMock.mockResolvedValue({
      data: null,
      error: new Error('boom'),
    });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const profile = await fetchUserProfile('user-2');

    expect(profile).toBeNull();
    expect(errorSpy).toHaveBeenCalledWith('Error fetching profile', expect.any(Error));

    errorSpy.mockRestore();
  });
});
