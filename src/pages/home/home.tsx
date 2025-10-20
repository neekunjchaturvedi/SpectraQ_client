import { Footer } from "@/components/common/footer";
import { Navigation } from "@/components/common/navbar";
import { ActivityFeedSection } from "@/components/home/activityFeed";
import { CategoriesSection } from "@/components/home/categories";
import { CTASection } from "@/components/home/ctaSection";
import { FeaturesSection } from "@/components/home/features";
import { HeroSection } from "@/components/home/heroSection";
import { TrendingMarkets } from "@/components/home/trendingMarkets";

const Home = () => {
  return (
    <>
      <Navigation />
      <HeroSection />
      <CategoriesSection />
      <TrendingMarkets />
      <FeaturesSection />
      <ActivityFeedSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default Home;
