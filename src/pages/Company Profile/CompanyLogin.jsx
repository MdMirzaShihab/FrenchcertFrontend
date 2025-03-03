import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { companiesData } from "../../constants/staticData";

const CompanyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Find the company with the matching email
    const company = companiesData.find((company) => company.companyEmail === email);

    if (company) {
      // Check if the password matches
      if (company.password === password) {
        setError("");
        // Redirect to the company details page with the company ID
        navigate(`/company-details/${company.companyID}`);
      } else {
        setError("Incorrect password.");
      }
    } else {
      setError("Company not found.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Company Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Company Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyLogin;