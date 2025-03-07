import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { companiesData } from "../constants/staticData";

const ValidateCertificate = () => {
  const { certificationID } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [company, setCompany] = useState(null);
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
    setCompany(null);
    setError("");
    setSuccess("");

    // Search for the certificate in companiesData
    let foundCertificate = null;
    let foundCompany = null;
    for (const company of companiesData) {
      foundCertificate = company.certifications.find(
        (cert) => cert.certificationID === certificationID
      );
      if (foundCertificate) {
        foundCompany = company;
        break;
      }
    }

    if (foundCertificate && foundCompany) {
      setCertificate(foundCertificate);
      setCompany(foundCompany);
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
            <p className="text-green-600 font-semibold text-center">
              {success}
            </p>
          </div>
        )}

        {/* Display Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        )}

        {/* Display Company Details in Table Format */}
        {company && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Company Details
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="w-1/3 px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                      Field
                    </th>
                    <th className="w-2/3 px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Company Name
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-700">
                      {company.companyName}
                    </td>
                  </tr>
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
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Company Address
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {company.companyAddress}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Scope
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {company.companyScope}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Company Origin
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {company.companyOrigin}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    Site 2:
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    Scope 2:
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Display Certification Details in Table Format */}
        {certificate && (
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Certification Details
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="w-1/3 px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                      Field
                    </th>
                    <th className="w-2/3 px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Certification Number
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {certificate.certificationID}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    Scheme
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {certificate.certificationName}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    Validity Period
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {certificate.validity}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Issue Date
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(certificate.issueDate)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      First Surveillance Date
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(certificate.FirstSurveillanceDate)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Second Surveillance Date
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(certificate.SecondSurveillanceDate)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Expiry Date
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(certificate.expiryDate)}
                    </td>
                  </tr>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidateCertificate;
