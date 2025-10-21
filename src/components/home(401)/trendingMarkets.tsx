import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { MarketCard } from "../markets/marketCard";

const trendingMarkets = [
  {
    id: "1",
    title: "Will Bitcoin reach $100,000 by end of 2024?",
    description:
      "Market prediction for Bitcoin price reaching six-figure milestone by December 31, 2024.",
    category: "Crypto",
    endDate: "2024-12-31",
    volume: "$2.4M",
    participants: 1247,
    yesPrice: 0.65,
    noPrice: 0.35,
    status: "active" as const,
  },
  {
    id: "2",
    title: "Will OpenAI release GPT-5 in 2024?",
    description:
      "Prediction market for the release of GPT-5 by OpenAI within the 2024 calendar year.",
    category: "AI",
    endDate: "2024-12-31",
    volume: "$1.8M",
    participants: 892,
    yesPrice: 0.42,
    noPrice: 0.58,
    status: "active" as const,
  },
  {
    id: "3",
    title: "Will Tesla stock hit $300 before Q2 2024?",
    description:
      "Market for Tesla stock price prediction reaching $300 per share before Q2 2024.",
    category: "Stocks",
    endDate: "2024-06-30",
    volume: "$956K",
    participants: 567,
    yesPrice: 0.28,
    noPrice: 0.72,
    status: "active" as const,
  },
  {
    id: "4",
    title: "Will SpaceX successfully land on Mars by 2026?",
    description:
      "Prediction for SpaceX achieving the first successful Mars landing mission by 2026.",
    category: "Space",
    endDate: "2026-12-31",
    volume: "$3.2M",
    participants: 2134,
    yesPrice: 0.15,
    noPrice: 0.85,
    status: "active" as const,
  },
  {
    id: "5",
    title: "Will the Fed cut rates by 50bp in next meeting?",
    description:
      "Federal Reserve interest rate cut prediction for the upcoming FOMC meeting.",
    category: "Economics",
    endDate: "2024-03-20",
    volume: "$1.2M",
    participants: 743,
    yesPrice: 0.73,
    noPrice: 0.27,
    status: "active" as const,
  },
  {
    id: "6",
    title: "Will Ethereum 2.0 staking exceed 40M ETH?",
    description:
      "Prediction for total Ethereum staked in ETH 2.0 to surpass 40 million ETH.",
    category: "Crypto",
    endDate: "2024-09-30",
    volume: "$842K",
    participants: 421,
    yesPrice: 0.89,
    noPrice: 0.11,
    status: "active" as const,
  },
  {
    id: "7",
    title: "Will Apple announce VR headset successor in 2024?",
    description:
      "Market for Apple announcing a new VR/AR headset product in 2024.",
    category: "Tech",
    endDate: "2024-12-31",
    volume: "$1.5M",
    participants: 689,
    yesPrice: 0.56,
    noPrice: 0.44,
    status: "active" as const,
  },
  {
    id: "8",
    title: "Will global inflation drop below 3% by mid-2024?",
    description:
      "Prediction for global average inflation rate dropping below 3% by June 2024.",
    category: "Economics",
    endDate: "2024-06-30",
    volume: "$2.1M",
    participants: 1543,
    yesPrice: 0.61,
    noPrice: 0.39,
    status: "active" as const,
  },
];

export const TrendingMarkets = () => (
  <section className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-12 text-left">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Trending Markets
          </h2>
          <p className="text-muted-foreground mt-2">
            The most active prediction markets right now
          </p>
        </div>
        <Link to="/markets">
          <Button variant="outline" className="btn-outline-quantum">
            View All Markets
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingMarkets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>
    </div>
  </section>
);
