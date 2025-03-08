import React from "react";

const ISO27001 = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          ISO 27001 Certification – Securing Your Information
        </h1>

        {/* Introduction Section */}
        <div className="mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            At <span className="font-semibold text-blue-800">French Cert</span>,
            we specialize in providing expert ISO 27001 certification services.
            ISO 27001 is a globally recognized standard for Information Security
            Management Systems (ISMS), designed to safeguard your sensitive
            information and ensure it is protected from security threats.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Our team of highly qualified auditors works alongside you to assess
            and enhance your organization's information security practices,
            ensuring full compliance with ISO 27001 standards. We conduct
            thorough audits to help you implement the necessary controls and
            safeguards to protect your data.
          </p>
        </div>

        {/* Why Choose ISO 27001 Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Why ISO 27001 Certification?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            ISO 27001 certification brings significant benefits to your
            organization. It allows you to secure your information, identify
            potential risks, and comply with regulatory requirements. By
            achieving ISO 27001 certification, you not only protect your data
            but also demonstrate your commitment to information security,
            building trust with your customers, partners, and stakeholders.
          </p>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Our ISO 27001 Services Include:
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>
              <strong>Certification Audits:</strong> Detailed assessments to
              evaluate the conformity of your ISMS with ISO 27001 requirements.
            </li>
            <li>
              <strong>Issuance of ISO 27001 Certificates:</strong> Official
              recognition of your organization’s compliance with the information
              security standards.
            </li>
            <li>
              <strong>Ongoing Support:</strong> Surveillance and recertification
              audits to ensure continued compliance and to address evolving
              risks, in line with prescribed timelines and standards.
            </li>
          </ul>
        </div>

        {/* Additional Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Additional Services
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            In addition to certification, <span className="font-semibold">French Cert</span> offers
            training, inspections, and testing services, ensuring that your
            information security practices remain robust and effective. With our
            support, you can enhance your information security posture and
            improve your competitive edge in the marketplace.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Let French Cert Help You Secure Your Sensitive Information
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Contact us today to learn more about how ISO 27001 certification can
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

export default ISO27001;