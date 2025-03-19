import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SpecialtySection from "../components/Speciality";
import TopDoctors from "../components/TopDoctors";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <SpecialtySection />
      <TopDoctors />
    </>
  );
};

export default Home;
