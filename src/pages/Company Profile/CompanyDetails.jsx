import React from "react";
import { useParams } from "react-router-dom";
import { companiesData } from "../../constants/staticData";

const CompanyDetails = () => {
  const { companyID } = useParams();
  const company = companiesData.find((company) => company.companyID === parseInt(companyID));

  if (!company) {
    return <div className="text-center text-red-500">Company not found.</div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">{company.companyName}</h1>
        <div className="space-y-6">
          {/* Company Information */}
          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Company Information</h2>
            <p className="text-gray-700">
              <strong>Email:</strong> {company.companyEmail}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {company.companyPhone}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {company.companyAddress}
            </p>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Certifications</h2>
            <ul className="space-y-2">
              {company.certifications.map((cert) => (
                <li key={cert.certificationID} className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-semibold">{cert.certificationName}</p>
                  <p className="text-gray-700">
                    <strong>ID:</strong> {cert.certificationID}
                  </p>
                  <p className="text-gray-700">
                    <strong>Issue Date:</strong> {cert.issueDate}
                  </p>
                  <p className="text-gray-700">
                    <strong>Expiry Date:</strong> {cert.expiryDate}
                  </p>
                  <p className="text-gray-700">
                    <strong>Status:</strong> {cert.validity}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Trainings */}
          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Trainings</h2>
            <ul className="space-y-2">
              {company.trainings.map((training) => (
                <li key={training.trainingID} className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 font-semibold">{training.trainingName}</p>
                  <p className="text-gray-700">
                    <strong>Completion Date:</strong> {training.completionDate}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Accreditations */}
          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Accreditations</h2>
            <ul className="space-y-2">
              {company.accreditations.map((acc) => (
                <li key={acc.accreditationID} className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-semibold">{acc.accreditationName}</p>
                  <p className="text-gray-700">
                    <strong>Issue Date:</strong> {acc.issueDate}
                  </p>
                  <p className="text-gray-700">
                    <strong>Expiry Date:</strong> {acc.expiryDate}
                  </p>
                  <p className="text-gray-700">
                    <strong>Status:</strong> {acc.validity}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;