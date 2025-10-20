import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lightbulb, Zap, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Transactions",
    description:
      "All transactions are secured on the Avalanche blockchain with state-of-the-art cryptography.",
  },
  {
    icon: Lightbulb,
    title: "Collective Intelligence",
    description:
      "Harness the wisdom of crowds to discover the most accurate predictions for future events.",
  },
  {
    icon: Zap,
    title: "Instant Settlement",
    description:
      "Markets resolve instantly once outcomes are determined, with automatic payouts to winners.",
  },
  {
    icon: TrendingUp,
    title: "Real Yield",
    description:
      "Earn real returns on your predictions while participating in market price discovery.",
  },
];

export const FeaturesSection = () => (
  <section className="py-16 bg-card/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground">
          Why Choose SpectraQ
        </h2>
        <p className="text-muted-foreground mt-2">
          The most advanced prediction market platform on Avalanche
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <Card
            key={i}
            className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all"
          >
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="w-6 h-6 text-quantum-red" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
