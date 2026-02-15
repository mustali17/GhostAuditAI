import { Request, Response } from 'express';
import Stripe from 'stripe';
import User from '../models/User';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-01-28.clover' as any, // Cast to avoid TS issues if types mismatch
});

// Map tiers to Stripe Price IDs (Replace with real IDs in production)
const TIER_PRICES = {
  GROWTH: 'price_growth_id', // Mock or Env var
  AGENCY: 'price_agency_id', // Mock or Env var
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { tier } = req.body;
  const userId = req.user?._id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let priceId = '';
    if (tier === 'GROWTH') priceId = process.env.STRIPE_PRICE_GROWTH || TIER_PRICES.GROWTH;
    if (tier === 'AGENCY') priceId = process.env.STRIPE_PRICE_AGENCY || TIER_PRICES.AGENCY;

    if (!priceId) return res.status(400).json({ message: 'Invalid tier' });

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/settings/billing?success=true`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/settings/billing?canceled=true`,
      customer_email: user.email,
      metadata: {
        userId: userId?.toString() || '',
        tier: tier,
      },
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: 'Failed to create checkout session' });
  }
};

export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const tier = session.metadata?.tier;
      
      if (userId && tier) {
          await User.findByIdAndUpdate(userId, {
              stripeCustomerId: session.customer as string,
              subscriptionId: session.subscription as string,
              subscriptionStatus: 'active',
              tier: tier,
          });
          console.log(`User ${userId} upgraded to ${tier}`);
      }
      break;
    
    // Add logic for invoice.payment_failed, customer.subscription.deleted etc.
    case 'customer.subscription.deleted':
         // Handle cancellation
         break;
         
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send();
};
