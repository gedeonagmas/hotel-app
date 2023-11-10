import React, { useEffect } from "react";
import Hero from "../components/Hero/Hero";
import Highlights from "../components/Highlights/Highlights";
import TopRated from "../components/TopRated/TopRated";
import Footer from "../components/Footer/Footer";
import Contact from "../components/Contact/Contact";
import About from "../components/About/About";
import PlanTrip from "../components/Plan/PlanTrip";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Hero />
      <Highlights />
      <TopRated />
      <PlanTrip />
      <About type="home" />
      <Contact type="home" />
      <Footer />
    </div>
  );
};

export default Home;
