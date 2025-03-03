import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // Import the Footer component
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content with margin to avoid overlap with Navbar */}
      <main className="mt-16">
        <Outlet /> {/* This renders the active page inside Layout */}
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </>
  );
};

export default Layout;