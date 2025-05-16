import React from "react";
import Hero from "./components/Hero";
import PriceCalculator from "../main/components/PriceCalculator";
import WhyDominant from "../main/components/WhyDominant";
import Block from "../main/components/Block";
import Consultation from "../main/components/Consultation";
import WeHelp from "../main/components/WeHelp";
import VideoFeedback from "../main/components/VideoFeedback";
import FeedBacks from "../main/components/FeedBacks";
import WereChosen from "../main/components/WereChosen";
import PopularServices from "../main/components/PopularServices";
import Footer from "../footer/Footer";
import ServicePriceList from "./components/ServicePriceList";

const ServicesComponent = () => {
  return (
    <>
      <Hero />
      <ServicePriceList/>
      <PriceCalculator />
      <WhyDominant />
      <Block />
      <PopularServices />
      <WereChosen />
      <FeedBacks />
      <VideoFeedback />
      <WeHelp />
      <Consultation />
    </>
  );
};

export default ServicesComponent;
