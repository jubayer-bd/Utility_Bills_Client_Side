import React, { useEffect } from "react";
import Banner from "./Banner";
import Category from "./CategoryCards";
import RecentBills from "./RecentBills";
import WhyChooseUs from "../../components/WhyChosseUs";
import Partners from "../../components/Partners";
import { SavingsBanner } from "./SmartSavingTip";
import { FeaturesSection } from "./Fetures";
import { WorkflowSection } from "./HowItsWorks";
import { StatsSection } from "./StatsSection";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import Blogs from "./Blogs";
import Newsletter from "./Newsletter";

const Home = () => {
  useEffect(() => {
    document.title = "Home | UtilityBill";
  }, []);
  return (
    <div className="lg:max-w-7xl mx-auto max-w-11/12">
      <Banner />
      <Category />
      <RecentBills />
      <WhyChooseUs />
      <SavingsBanner />
      <FeaturesSection />
      <WorkflowSection />
      <StatsSection />
      <Testimonials />
      <FAQ />
      <Blogs />
      <Newsletter />
      <Partners />
    </div>
  );
};

export default Home;
