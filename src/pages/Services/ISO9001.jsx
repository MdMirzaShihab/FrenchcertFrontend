import React from "react";

const ISO9001 = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          ISO 9001 Certification
        </h1>

        {/* Introduction Section */}
        <div className="mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            At <span className="font-semibold text-blue-800">French Cert</span>,
            we specialize in providing ISO 9001 certification services, a globally
            recognized standard for quality management systems. ISO 9001 serves
            as a solid foundation for continuous process and service improvement,
            helping your organization maintain high-quality standards across all
            operations.
          </p>
        </div>

        {/* Why Choose ISO 9001 Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why Choose ISO 9001 Certification?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            ISO 9001 certification offers a wealth of advantages for your
            company, including the optimization of internal processes, enhanced
            customer satisfaction, and improved competitiveness. By adopting a
            robust quality management system based on ISO 9001, your company
            builds trust with customers and partners, strengthening your position
            in the marketplace.
          </p>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Our ISO 9001 Services Include:
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>
              Certification audits to assess your system's compliance and
              effectiveness
            </li>
            <li>
              Issuance of ISO 9001 certificates, confirming your adherence to the
              standard's requirements
            </li>
            <li>
              Ongoing support through surveillance and recertification audits to
              maintain certification, in accordance with the prescribed timelines
              and procedures
            </li>
          </ul>
        </div>

        {/* Additional Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Additional Services
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            In addition to certification, we offer training, inspections, and
            testing services, helping you achieve and maintain the highest
            standards of quality management. Our support will help you strengthen
            the trust of your customers, partners, and employees, enhancing your
            competitive edge.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Let Us Help You Improve Your Quality Processes
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Contact us today to learn more about how ISO 9001 certification can
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

export default ISO9001;