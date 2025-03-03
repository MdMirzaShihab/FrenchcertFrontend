import React, { useState } from "react";
import { companiesData } from "../constants/staticData";

const ValidateCertificate = () => {
  const [certificationID, setCertificationID] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();

    // Reset state
    setCertificate(null);
    setCompanyName("");
    setError("");
    setSuccess("");

    // Search for the certificate in companiesData
    let foundCertificate = null;
    let foundCompanyName = "";
    for (const company of companiesData) {
      foundCertificate = company.certifications.find(
        (cert) => cert.certificationID === certificationID
      );
      if (foundCertificate) {
        foundCompanyName = company.companyName;
        break;
      }
    }

    if (foundCertificate) {
      setCertificate(foundCertificate);
      setCompanyName(foundCompanyName);
      setSuccess("Certificate verified successfully!");
    } else {
      setError("Certificate not found. Please check the ID and try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-green-50 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          Verify Certificate
        </h1>
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

        {/* Display Success Message */}
        {success && (
          <div className="mt-8 p-6 bg-green-50 rounded-lg">
            <p className="text-green-600 font-semibold">{success}</p>
          </div>
        )}

        {/* Display Certificate Details */}
        {certificate && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Certificate Details
            </h2>
            <p className="text-gray-700">
              <strong>Company Name:</strong> {companyName}
            </p>
            <p className="text-gray-700">
              <strong>Name:</strong> {certificate.certificationName}
            </p>
            <p className="text-gray-700">
              <strong>ID:</strong> {certificate.certificationID}
            </p>
            <p className="text-gray-700">
              <strong>Issue Date:</strong> {certificate.issueDate}
            </p>
            <p className="text-gray-700">
              <strong>Expiry Date:</strong> {certificate.expiryDate}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> {certificate.validity}
            </p>
          </div>
        )}

        {/* Display Error Message */}
        {error && (
          <div className="mt-8 p-6 bg-red-50 rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidateCertificate;
