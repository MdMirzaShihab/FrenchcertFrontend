import React from "react";

const ISO14001 = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          ISO 14001 Certification – Committing to a Greener Future
        </h1>

        {/* Introduction Section */}
        <div className="mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            At <span className="font-semibold text-blue-800">French Cert</span>,
            we are dedicated to providing expert ISO 14001 certification services.
            ISO 14001 is a globally recognized standard for Environmental
            Management Systems (EMS), designed to help businesses minimize their
            environmental impact and implement sustainable practices.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Our team of skilled auditors works closely with you to establish and
            refine an EMS that meets the stringent requirements of ISO 14001.
            Through comprehensive audits and evaluations, we ensure your
            organization aligns with the best environmental practices, promoting
            both compliance and sustainability.
          </p>
        </div>

        {/* Why Choose ISO 14001 Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why ISO 14001 Certification?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            ISO 14001 certification offers a host of benefits for your business.
            It enables you to proactively manage environmental risks, adhere to
            relevant environmental laws, and continually improve your
            environmental performance. By adopting a robust EMS in line with ISO
            14001, you not only showcase your commitment to environmental
            stewardship but also build trust with customers, partners, and
            stakeholders.
          </p>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Our ISO 14001 Services Include:
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>
              <strong>Certification Audits:</strong> In-depth assessments to
              evaluate the conformity and effectiveness of your EMS.
            </li>
            <li>
              <strong>Issuance of ISO 14001 Certificates:</strong> Formal
              recognition of your company’s compliance with the ISO 14001
              standards.
            </li>
            <li>
              <strong>Ongoing Support:</strong> Surveillance and recertification
              audits conducted in line with regulatory timelines and procedures
              to maintain your certification.
            </li>
          </ul>
        </div>

        {/* Additional Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Additional Services
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            In addition to certification, <span className="font-semibold text-blue-800">French Cert</span> provides
            training, inspections, and testing services, ensuring that your
            environmental management system operates at the highest standards.
            With our guidance, you can not only improve your environmental
            performance but also strengthen your market competitiveness and
            foster deeper trust with customers, employees, and business partners.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Let French Cert Guide You Toward a More Sustainable Future
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Contact us today to learn more about how ISO 14001 certification can
            benefit your organization.
          </p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default ISO14001;