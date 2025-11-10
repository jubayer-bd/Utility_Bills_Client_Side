import React, { useEffect } from "react";
import Banner from "./Banner";
import Category from "./CategoryCards";
import RecentBills from "./RecentBills";
import WhyChooseUs from "../../components/WhyChosseUs";
import Partners from "../../components/Partners";

const Home = () => {
  useEffect(() => {
    document.title = "Home | UtilityBills";
  }, []);
  return (
    <div className="lg:max-w-7xl mx-auto max-w-11/12">
      <Banner />
      <Category />
      <RecentBills />
      <WhyChooseUs />
      <Partners />
    </div>
  );
};

export default Home;
