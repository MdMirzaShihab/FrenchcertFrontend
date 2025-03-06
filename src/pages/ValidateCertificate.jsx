import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { companiesData } from "../constants/staticData";

const ValidateCertificate = () => {
  const { certificationID } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Function to format date as dd/mm/yy
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
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
  }, [certificationID]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-green-50 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Certificate Details
        </h1>

        {/* Display Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-600 font-semibold text-center">{success}</p>
          </div>
        )}

        {/* Display Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        )}

        {/* Display Certificate Details in Table Format */}
        {certificate && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                    Field
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Company Name */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    Company Name
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {companyName}
                  </td>
                </tr>

                {/* Certification Name */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    Certification Name
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {certificate.certificationName}
                  </td>
                </tr>

                {/* Certification ID */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    Certification ID
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {certificate.certificationID}
                  </td>
                </tr>

                {/* Issue Date */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    Issue Date
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatDate(certificate.issueDate)}
                  </td>
                </tr>

                {/* First Surveillance Date */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    First Surveillance Date
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatDate(certificate.FirstSurveillanceDate)}
                  </td>
                </tr>

                {/* Second Surveillance Date */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    Second Surveillance Date
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatDate(certificate.SecondSurveillanceDate)}
                  </td>
                </tr>

                {/* Expiry Date */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    Expiry Date
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatDate(certificate.expiryDate)}
                  </td>
                </tr>

                {/* Status */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    Status
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {certificate.status}
                    </span>
                  </td>
                </tr>

                {/* Accreditation */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    Accreditation
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {certificate.Accreditation}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidateCertificate;