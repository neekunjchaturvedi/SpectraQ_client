import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export const CTASection = () => {
  const [marketCount, setMarketCount] = useState(0);

  // Animate market count on load
  useEffect(() => {
    const target = 1247;
    const duration = 2000; // 2 seconds
    const stepTime = 20; // Update every 20ms
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const updateCount = () => {
      current += increment;
      if (current >= target) {
        setMarketCount(target);
        clearInterval(timer);
      } else {
        setMarketCount(Math.floor(current));
      }
    };

    const timer = setInterval(updateCount, stepTime);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-black via-black to-red-900">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-background"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-6">
          Ready to Predict the Future?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Join thousands of traders on SpectraQ and start earning from your
          predictions today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/markets">
            <Button
              size="lg"
              className="btn-quantum px-8 py-4 text-lg shadow-xl"
            >
              Start Trading Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="mt-12 flex justify-center">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">
                {marketCount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Markets Created
              </div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">$24.7M</div>
              <div className="text-sm text-muted-foreground">
                Total Value Locked
              </div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">12,847</div>
              <div className="text-sm text-muted-foreground">
                Active Traders
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
