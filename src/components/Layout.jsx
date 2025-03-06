import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import VerifyCertificate from "../components/VerifyCertificate";

const Layout = () => {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content with margin to avoid overlap with Navbar */}
      <main className="mt-24">
        <Outlet /> {/* This renders the active page inside Layout */}
      </main>

      {/* Footer at the bottom */}
      <Footer />

      {/* Floating Verify Button and Form */}
      <VerifyCertificate />
    </>
  );
};

export default Layout;