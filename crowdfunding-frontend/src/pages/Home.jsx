import React from "react";
import ImpactBanner from "../components/Home/ImpactBanner";
import FeaturedCampaigns from "../components/Home/FeaturedCampaigns";
import HowItWorks from "../components/Home/HowItWorks";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import Testimonials from "../components/Home/Testimonials";
import Newsletter from "../components/Home/Newsletter";
import AdvertisementCarousel from "../components/Home/AdvertisementCarousel";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <ImpactBanner />
      <AdvertisementCarousel />
      <FeaturedCampaigns />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
