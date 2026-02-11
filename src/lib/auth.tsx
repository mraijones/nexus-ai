import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Subscription, User } from "@supabase/supabase-js";

type Profile = {
  id: string;
  full_name: string | null;
  subscription_tier: string | null;
  company?: string | null;
};

type AuthContextValue = {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// global singleton subscription holder
type GlobalWithAuthSub = typeof globalThis & { __supabaseAuthSub?: Subscription };
const g = globalThis as GlobalWithAuthSub;

function ensureGlobalAuthListener(onUserChange: (user: User | null) => void) {
  const authListener = supabase?.auth.onAuthStateChange((_event, session) => {
    onUserChange(session?.user ?? null);
  });

  if (authListener) {
    g.__supabaseAuthSub = authListener.data.subscription;
  }
}

export async function fetchUserProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, subscription_tier, company')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile', error);
    return null;
  }

  return data as Profile | null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const applyUser = async (nextUser: User | null) => {
    setUser(nextUser);

    if (!nextUser) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const p = await fetchUserProfile(nextUser.id);
      setProfile(p);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    const { data, error } = await (supabase?.auth.getSession() ?? {
      data: null,
      error: new Error("Supabase client is not initialized"),
    });
    if (error) throw error;
    await applyUser(data.session?.user ?? null);
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await (supabase?.auth.signInWithPassword({ email, password }) ?? { error: new Error("Supabase client is not initialized") });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, fullName: string, company?: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    // Insert profile with full_name if sign up succeeded
    if (data?.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: data.user.id, full_name: fullName, company: company ?? null }]);
      if (profileError) throw profileError;
    }
  };

  const signOut = async () => {
    const { error } = await (supabase?.auth.signOut() ?? { error: new Error("Supabase client is not initialized") });
    if (error) throw error;
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { data, error } = await (supabase?.auth.getSession() ?? {
          data: null,
          error: new Error("Supabase client is not initialized"),
        });
        if (error) throw error;
        if (!cancelled) await applyUser(data.session?.user ?? null);
      } catch {
        if (!cancelled) {
          setUser(null);
          setProfile(null);
          setIsLoading(false);
        }
      }
    })();

    ensureGlobalAuthListener((nextUser) => {
      void applyUser(nextUser);
    });

    return () => {
      cancelled = true;
      // intentionally do not unsubscribe the global listener
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, profile, isLoading, refreshProfile, signIn, signUp, signOut }),
    [user, profile, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
  return ctx;
}
