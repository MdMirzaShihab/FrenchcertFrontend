import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../assets/Verify.png"; // Import the icon for the floating button

const VerifyCertificate = () => {
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility
  const [certificationID, setCertificationID] = useState("");
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    navigate(`/validate/${certificationID}`);
    setIsFormVisible(false); // Close the form after navigation
  };

  return (
    <>
      {/* Floating Verify Button and Form Container */}
      <div className="fixed right-2 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-end gap-4 sm:top-1/2 sm:right-8 bg-">
        {/* Floating Verify Button */}
        <div className="flex items-center group">
          <p className="text-blue-600 hidden md:block font-bold text-2xl font-dancing-script opacity-20 transition-opacity duration-700 group-hover:opacity-100">
            Click to Verify
          </p>
          <button
            onClick={() => setIsFormVisible(!isFormVisible)} // Toggle form visibility
            className="">
            <img
              src={icon}
              alt="Verify"
              className="w-16 h-16 transition-all duration-700 group-hover:-translate-y-3"
            />
            {/* Use the imported icon */}
          </button>
        </div>

        {/* VerifyCertificate Form */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isFormVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-64">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold text-blue-800">
                Verify Certificate
              </h1>
              <button
                onClick={() => setIsFormVisible(false)} // Close the form
                className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <form onSubmit={handleVerify} className="space-y-4">
              <input
                type="text"
                placeholder="Enter Certification ID"
                value={certificationID}
                onChange={(e) => setCertificationID(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300">
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyCertificate;
