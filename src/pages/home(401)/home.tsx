import { Footer } from "@/components/common/footer";
import { Navigation } from "@/components/common/navbar";
import { ActivityFeedSection } from "@/components/home(401)/activityFeed";
import { CategoriesSection } from "@/components/home(401)/categories";
import { CTASection } from "@/components/home(401)/ctaSection";
import { FeaturesSection } from "@/components/home(401)/features";
import { HeroSection } from "@/components/home(401)/heroSection";
import { TrendingMarkets } from "@/components/home(401)/trendingMarkets";

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
