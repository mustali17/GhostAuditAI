import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Zap } from "lucide-react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Badge } from "@/components/ui/badge";

// Make sure to set this in env.local
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  tierKey: string;
  currentTier: string;
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  tierKey,
  currentTier,
}: PricingCardProps) {
  const isCurrent = currentTier === tierKey;
  const isPro = tierKey === "AGENCY" || tierKey === "GROWTH";

  const handleUpgrade = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/subscription/create-session`,
        { tier: tierKey },
        { withCredentials: true },
      );

      const stripe = await stripePromise;
      if (stripe && response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Upgrade failed", error);
      alert("Failed to start upgrade process");
    }
  };

  return (
    <Card
      className={`relative flex flex-col transition-all duration-300 hover:scale-[1.02] ${
        isPro
          ? "glass-card border-primary/50 shadow-[0_0_30px_rgba(124,58,237,0.1)] hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]"
          : "glass-card md:hover:border-primary/20"
      } backdrop-blur-sm overflow-hidden group`}
    >
      {isPro && (
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary opacity-70" />
      )}

      {isCurrent && (
        <div className="absolute top-4 right-4 animate-in fade-in zoom-in duration-500">
          <Badge
            variant="default"
            className="bg-primary/20 text-primary border-primary/50 hover:bg-primary/30"
          >
            Current Plan
          </Badge>
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          {title}
          {isPro && tierKey === "AGENCY" && (
            <Zap className="h-5 w-5 text-yellow-500 fill-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)] animate-pulse" />
          )}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        <div className="text-4xl font-bold tracking-tight text-foreground">
          {price}
          <span className="text-lg font-normal text-muted-foreground ml-1">
            /mo
          </span>
        </div>

        <ul className="space-y-4">
          {features.map((feature, i) => (
            <li
              key={i}
              className="flex items-start text-sm text-foreground/80 group/item"
            >
              <div
                className={`mt-0.5 mr-3 flex h-5 w-5 items-center justify-center rounded-full ${isPro ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
              >
                <Check className="h-3 w-3" />
              </div>
              <span className="group-hover/item:text-foreground transition-colors">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className={`w-full h-11 text-base font-medium transition-all ${
            isCurrent
              ? "bg-muted text-muted-foreground hover:bg-muted"
              : isPro
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
                : "bg-white text-black hover:bg-white/90"
          }`}
          disabled={isCurrent}
          onClick={!isCurrent ? handleUpgrade : undefined}
        >
          {isCurrent ? "Active Plan" : `Upgrade to ${title}`}
        </Button>
      </CardFooter>
    </Card>
  );
}
