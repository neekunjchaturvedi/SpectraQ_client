import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CircleDollarSign,
  Clock,
  FileText,
  Flame,
  TrendingUp,
  User2,
} from "lucide-react";

interface Market {
  id: string;
  title: string;
  description: string;
  category: string;
  endDate: string;
  volume: string;
  participants: number;
  yesPrice: number;
  noPrice: number;
  status: "active" | "resolved" | "upcoming";
  proposals?: Array<{
    id: string;
    title: string;
    yesPrice: number;
    noPrice: number;
    status: "active" | "resolved" | "upcoming";
  }>;
}

interface MarketCardProps {
  market: Market;
  className?: string;
}

export function MarketCard({ market, className = "" }: MarketCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-white";
      case "resolved":
        return "bg-gray-500 text-white";
      case "upcoming":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      crypto: "bg-blue-600 text-white",
      ai: "bg-purple-600 text-white",
      stocks: "bg-green-600 text-white",
      space: "bg-indigo-600 text-white",
      economics: "bg-orange-600 text-white",
      tech: "bg-pink-600 text-white",
      default: "bg-gray-600 text-white",
    };
    return (
      colors[category.toLowerCase() as keyof typeof colors] || colors.default
    );
  };

  // Calculate time remaining
  const getTimeRemaining = () => {
    const now = new Date();
    const end = new Date(market.endDate);
    const diffTime = end.getTime() - now.getTime();

    // If time is up
    if (diffTime <= 0) return "Ended";

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 30) {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""}`;
    }

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""}`;

    const diffHours = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""}`;

    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
  };

  // Check if market is trending (high volume or participants)
  const isTrending =
    market.participants > 500 ||
    parseFloat(market.volume.replace(/[^0-9.]/g, "")) > 1000;

  // Get probability text
  const getProbabilityText = (price: number) => {
    if (price >= 0.8) return "Very Likely";
    if (price >= 0.6) return "Likely";
    if (price >= 0.4) return "Uncertain";
    if (price >= 0.2) return "Unlikely";
    return "Very Unlikely";
  };

  return (
    <Link to={`/markets/${market.id}`} className={`block ${className}`}>
      <Card className="market-card bg-gray-950 border-gray-700/50 hover:border-quantum-red/50 hover:shadow-glow hover:scale-[1.02] transition-all duration-300 h-full backdrop-blur-sm overflow-hidden relative group market-card ">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gray-950 z-0"></div>

        <CardHeader className="pb-2 relative z-10">
          {/* Status and Category Badges */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex justify-between w-full">
              {isTrending && (
                <Badge className="bg-red-600/20 text-red-400 border border-red-600/30 text-xs px-2 py-1 rounded-full flex items-center shadow-glow">
                  <Flame className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              )}
              <Badge
                className={`${getCategoryColor(
                  market.category
                )} text-xs px-2 py-1 rounded-full font-medium`}
              >
                {market.category}
              </Badge>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 leading-tight line-clamp-2 group-hover:text-quantum-red transition-colors duration-300">
            {market.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
            {market.description}
          </p>
        </CardHeader>

        <CardContent className="pb-4 relative z-10">
          {/* YES/NO Price Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* YES Card */}
            <div className="bg-green-900/40 border border-green-700/50 rounded-xl p-4 relative overflow-hidden hover:bg-green-900/60 hover:border-green-600/70 transition-all duration-300">
              <div
                className="absolute bottom-0 left-0 h-1 bg-green-500 transition-all duration-300 group-hover:h-1.5"
                style={{ width: `${market.yesPrice * 100}%` }}
              />
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 font-semibold text-sm">
                  YES
                </span>
                {market.yesPrice > 0.6 && (
                  <TrendingUp className="w-3 h-3 text-green-400" />
                )}
              </div>
              <div className="text-2xl font-bold text-green-400 mb-1">
                ${market.yesPrice.toFixed(2)}
              </div>
              <div className="text-xs text-green-500">
                {getProbabilityText(market.yesPrice)}
              </div>
            </div>

            {/* NO Card */}
            <div className="bg-red-900/40 border border-red-700/50 rounded-xl p-4 relative overflow-hidden hover:bg-red-900/60 hover:border-red-600/70 transition-all duration-300">
              <div
                className="absolute bottom-0 left-0 h-1 bg-red-500 transition-all duration-300 group-hover:h-1.5"
                style={{ width: `${market.noPrice * 100}%` }}
              />
              <div className="flex items-center justify-between mb-2">
                <span className="text-red-400 font-semibold text-sm">NO</span>
                {market.noPrice > 0.6 && (
                  <TrendingUp className="w-3 h-3 text-red-400" />
                )}
              </div>
              <div className="text-2xl font-bold text-red-400 mb-1">
                ${market.noPrice.toFixed(2)}
              </div>
              <div className="text-xs text-red-500">
                {getProbabilityText(market.noPrice)}
              </div>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col items-center text-center group-hover:scale-105 transition-transform duration-300">
              <Clock className="w-5 h-5 text-gray-400 mb-2 group-hover:text-quantum-red transition-colors duration-300" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {getTimeRemaining()}
              </span>
            </div>
            <div className="flex flex-col items-center text-center group-hover:scale-105 transition-transform duration-300">
              <CircleDollarSign className="w-5 h-5 text-gray-400 mb-2 group-hover:text-quantum-red transition-colors duration-300" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {market.volume}
              </span>
            </div>
            <div className="flex flex-col items-center text-center group-hover:scale-105 transition-transform duration-300">
              {market.proposals && market.proposals.length > 0 ? (
                <>
                  <FileText className="w-5 h-5 text-gray-400 mb-2 group-hover:text-quantum-red transition-colors duration-300" />
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {market.proposals.length}
                  </span>
                </>
              ) : (
                <>
                  <User2 className="w-5 h-5 text-gray-400 mb-2 group-hover:text-quantum-red transition-colors duration-300" />
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {market.participants}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Proposals preview for user-created markets */}
          {market.proposals && market.proposals.length > 0 && (
            <div className="pt-4 border-t border-gray-700/50 group-hover:border-gray-600/70 transition-colors duration-300">
              <div className="text-xs text-gray-500 mb-3 group-hover:text-gray-400 transition-colors duration-300">
                Top Proposals:
              </div>
              <div className="space-y-2">
                {market.proposals.slice(0, 2).map((proposal) => (
                  <div
                    key={proposal.id}
                    className="flex items-center justify-between text-xs group-hover:bg-gray-800/30 rounded p-2 -m-2 transition-colors duration-300"
                  >
                    <span className="text-gray-400 truncate flex-1 mr-2 group-hover:text-gray-300 transition-colors duration-300">
                      {proposal.title}
                    </span>
                    <div className="flex space-x-2">
                      <span className="text-green-400 font-medium">
                        ${proposal.yesPrice.toFixed(2)}
                      </span>
                      <span className="text-gray-500">/</span>
                      <span className="text-red-400 font-medium">
                        ${proposal.noPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
                {market.proposals.length > 2 && (
                  <div className="text-xs text-gray-500 text-center pt-2 group-hover:text-gray-400 transition-colors duration-300">
                    +{market.proposals.length - 2} more proposals
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0 relative z-10">
          <Button className="w-full bg-gray-900 hover:bg-gradient-to-br from-black to-quantum-red text-white border-0 h-12 text-base font-semibold rounded-xl cursor-pointer hover:shadow-lg hover:shadow-quantum-red/25 hover:scale-[1.02]">
            Trade Now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
