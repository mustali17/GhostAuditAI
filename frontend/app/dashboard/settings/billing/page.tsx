'use client';

import { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import PricingCard from '@/components/billing/PricingCard';
import { useSearchParams } from 'next/navigation';

function BillingContent() {
  const [currentTier, setCurrentTier] = useState('FREE');
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentTier(response.data.tier || 'FREE');
      } catch (error) {
        console.error('Failed to fetch user', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="p-8 text-foreground">Loading billing info...</div>;

  return (
    <div className="space-y-6">
      <div> 
        <h1 className="text-2xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="text-muted-foreground">Manage your subscription plan and billing details.</p>
      </div>

      {searchParams.get('success') && (
          <div className="mb-4 p-4 bg-green-500/10 border border-green-500/50 text-green-500 rounded-md">
              Payment successful! Your plan has been upgraded.
          </div>
      )}
      
       {searchParams.get('canceled') && (
          <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 rounded-md">
              Payment canceled.
          </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <PricingCard
          title="Free Tier"
          price="$0/mo"
          description="For hobbyists and casual users."
          features={['5 Document Scans/mo', 'Basic AI Detection', 'Community Support']}
          tierKey="FREE"
          currentTier={currentTier}
        />
        <PricingCard
          title="Growth"
          price="$29/mo"
          description="For professional creators."
          features={['50 Document Scans/mo', 'Triple-Threat Audit', 'Humanizer Access', 'Priority Support']}
          tierKey="GROWTH"
          currentTier={currentTier}
        />
        <PricingCard
          title="Agency"
          price="$99/mo"
          description="For teams and high volume."
          features={['Unlimited Scans', 'API Access', 'White-label Reports', 'Dedicated Account Manager']}
          tierKey="AGENCY"
          currentTier={currentTier}
        />
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Loading...</div>}>
      <BillingContent />
    </Suspense>
  );
}
