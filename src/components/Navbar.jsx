import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/FrenchcertABcab.png";
import VerifyCertificate from "./VerifyCertificate"; // Import the VerifyCertificate component

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false); // For Verify modal

  return (
    <nav className="bg-white h-24 text-blue-900 font-semibold p-2 fixed w-full top-0 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center h-full object-cover">
        <Link to="/" className="h-full object-cover">
          <img src={logo} alt="Logo" className="h-full object-cover" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none">
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Desktop & Mobile Menu */}
        <ul
          className={`absolute md:static md:flex items-center gap-6 bg-white md:space-x-6 px-6 py-4 md:p-0 top-14 right-0 w-full md:w-auto transform ${
            isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
          } transition-transform duration-300 ease-in-out`}>
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                setIsVerifyModalOpen(true); // Open Verify modal
                setIsOpen(false); // Close mobile menu
              }}
              className="hover:text-blue-400 transition">
              Verify
            </button>
          </li>
          <li>
            <Link
              to="/process"
              className="hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}>
              Process
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link
              to="/career"
              className="hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}>
              Career
            </Link>
          </li>
          <li>
            <Link
              to="/join-us"
              className="hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}>
              Join Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}>
              Company Login
            </Link>
          </li>
        </ul>
      </div>

      {/* Verify Modal */}
      {isVerifyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsVerifyModalOpen(false)} // Close the modal
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              &times;
            </button>
            <VerifyCertificate
              onClose={() => setIsVerifyModalOpen(false)} // Pass a function to close the modal
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;