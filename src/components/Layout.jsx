import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="mt-16"> {/* Add margin to avoid overlap */}
        <Outlet /> {/* This renders the active page inside Layout */}
      </main>
    </>
  );
};

export default Layout;
