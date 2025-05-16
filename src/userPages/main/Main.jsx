import React from "react";
import Hero from "./components/Hero";
import PriceCalculator from "./components/PriceCalculator";
import Prices from "./components/Prices";
import Services from "./components/Services";
import WhyDominant from "./components/WhyDominant";
import Block from "./components/Block";
import FreeConsultation from "./components/FreeConsultation";
import WereChosen from "./components/WereChosen";
import FeedBacks from "./components/FeedBacks";
import VideoFeedback from "./components/VideoFeedback";
import WeHelp from "./components/WeHelp";
import PopularServices from "./components/PopularServices";
import NewsCompany from "./components/FormComponents/NewsCompany";
import Consultation from "./components/Consultation";
import Footer from "../footer/Footer";

const Main = () => {
  return (
    <>
      <Hero />
      <Prices />
      <Services />
      <PriceCalculator />
      <WhyDominant />
      <Block />
      <FreeConsultation />
      <WereChosen />
      <FeedBacks />
      <VideoFeedback />
      <WeHelp />
      <PopularServices />
      <NewsCompany />
      <Consultation />
      
    </>
  );
};

export default Main;
