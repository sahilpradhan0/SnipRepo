import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type SubscriptionPlan = 'free' | 'pro' | 'team';

interface Subscription {
  plan: SubscriptionPlan;
  status: 'active' | 'expired';
  start_date: string | null;
  end_date: string | null;
}

interface SubscriptionContextType {
  subscription: Subscription | null;
  loading: boolean;
  refreshSubscription: () => Promise<void>;
  isFree: boolean;
  isPro: boolean;
  isTeam: boolean;
  canCreateSnippet: (snippetCount: number) => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .single();

    if (!error) {
      setSubscription(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const isFree = subscription?.plan === 'free';
  const isPro = subscription?.plan === 'pro';
  const isTeam = subscription?.plan === 'team';

  const canCreateSnippet = (snippetCount: number) => {
    if (isFree) return snippetCount < 50;
    return true; // pro and team → unlimited
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        loading,
        refreshSubscription: fetchSubscription,
        isFree,
        isPro,
        isTeam,
        canCreateSnippet,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error("useSubscription must be inside SubscriptionProvider");
  return context;
};
