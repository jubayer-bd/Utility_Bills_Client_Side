import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <Outlet className="min-h-screen flex-1" />
      <Footer />
    </div>
  );
};

export default MainLayout;
