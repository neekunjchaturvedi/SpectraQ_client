import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  ArrowRight,
  ChartBar,
  DollarSign,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const stats = [
  {
    name: "Total Value Locked",
    value: "$24.7M",
    icon: DollarSign,
    change: "+12.4%",
  },
  {
    name: "Active Traders",
    value: "12,847",
    icon: Users,
    change: "+8.3%",
  },
  {
    name: "Markets Created",
    value: "1,247",
    icon: ChartBar,
    change: "+15.2%",
  },
];

export const HeroSection = () => (
  <section className="relative min-h-screen bg-quantum-black overflow-hidden ">
    {/* Animated Dot Grid Background */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 animated-dots-bg" />
    </div>

    {/* Grid Pattern Background */}
    <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-black to-red-900">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>

    {/* Gradient Overlays */}
    <div className="absolute inset-0 bg-gradient-to-br from-quantum-red/5 via-transparent to-transparent" />
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-quantum-red/10 via-transparent to-transparent" />

    {/* Additional gradient overlay for depth */}
    <div className="absolute inset-0 bg-gradient-to-t from-quantum-black/50 via-transparent to-transparent" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 z-10">
      <div className="flex flex-col lg:flex-row items-start gap-12 min-h-[80vh]">
        {/* Left Content */}
        <div className="lg:w-1/2 pt-12 text-left">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-quantum-red/10 text-quantum-red mb-8 border border-quantum-red/20 backdrop-blur-sm">
            <Zap className="w-4 h-4 mr-2" />
            Powered by Avalanche Blockchain
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
            <span className="text-white">The Future of</span>
            <br />
            <span className="text-quantum-red glow-text-red">Prediction</span>
            <br />
            <span className="text-quantum-red glow-text-red">Markets</span>{" "}
            <span className="text-white">is Here</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
            Trade on the outcomes of real-world events with unprecedented
            accuracy and security. From crypto prices to global events, make
            informed predictions and earn real rewards on SpectraQ.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <Link to="/markets">
              <Button
                size="lg"
                className="bg-quantum-red hover:bg-quantum-red/90 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-quantum-red/25 group backdrop-blur-sm"
              >
                <span className="flex items-center">
                  Explore Markets
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link to="/create">
              <Button
                size="lg"
                variant="ghost"
                className="text-quantum-red hover:text-white hover:bg-quantum-red/10 px-8 py-4 text-lg font-semibold border border-quantum-red/30 rounded-lg transition-all duration-300 backdrop-blur-sm"
              >
                Create Market
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-left backdrop-blur-sm bg-black/20 rounded-lg"
              >
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <stat.icon className="w-4 h-4 mr-2 text-quantum-red" />
                  {stat.name}
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-green-500 flex items-center">
                  {stat.change}
                  <TrendingUp className="w-3 h-3 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Featured Market Card */}
        <div className="lg:w-1/2 pt-12 lg:pt-20">
          <div className="relative max-w-md ml-auto">
            {/* Card */}
            <div className="bg-gradient-to-br from-black to-red-900 backdrop-blur-md rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-8 text-left">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Featured Market
                  </h3>
                  <p className="text-gray-400">
                    Will Bitcoin reach $100K in 2024?
                  </p>
                </div>
                <Badge className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </Badge>
              </div>

              {/* YES/NO Cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-sm text-green-400 font-medium mb-2">
                    YES
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-1">
                    $0.65
                  </div>
                  <div className="text-sm text-green-500">65% probability</div>
                </div>
                <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-sm text-red-400 font-medium mb-2">
                    NO
                  </div>
                  <div className="text-3xl font-bold text-red-400 mb-1">
                    $0.35
                  </div>
                  <div className="text-sm text-red-500">35% probability</div>
                </div>
              </div>

              {/* Market Stats */}
              <div className="flex items-center justify-between text-sm text-gray-400 mb-8">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>1,247 traders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>$2.4M volume</span>
                </div>
              </div>

              {/* Trade Button */}
              <Link to="/markets/1">
                <Button className="w-full bg-quantum-red hover:bg-quantum-red/90 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-quantum-red/25">
                  Trade Now
                </Button>
              </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-quantum-red/20 rounded-full blur-2xl animate-pulse-glow" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-quantum-red/10 rounded-full blur-3xl animate-pulse-glow" />
          </div>
        </div>
      </div>
    </div>
  </section>
);
