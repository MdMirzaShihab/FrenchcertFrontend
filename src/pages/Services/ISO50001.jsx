import React from "react";

const ISO50001 = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          ISO 50001 Certification – Boost Your Energy Efficiency with French Cert
        </h1>

        {/* Introduction Section */}
        <div className="mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            At <span className="font-semibold text-blue-800">French Cert</span>,
            we specialize in providing comprehensive ISO 50001 certification
            services. ISO 50001 is an internationally recognized standard for
            Energy Management Systems (EnMS), designed to help organizations
            measure, manage, and optimize their energy usage. By implementing an
            effective EnMS, businesses can reduce energy costs, improve energy
            efficiency, and lessen their environmental impact.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Our team of experienced auditors conducts thorough assessments to
            evaluate your EnMS and determine if it meets the requirements of the
            ISO 50001 standard. We work closely with you to help ensure that you
            achieve your energy management goals and maximize the benefits of
            energy optimization.
          </p>
        </div>

        {/* Why Choose ISO 50001 Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Why ISO 50001 Certification?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            ISO 50001 certification offers several key benefits to your
            organization. By choosing certification, you can:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 mt-4">
            <li>
              <strong>Demonstrate Commitment to Sustainability:</strong> Showcase
              your dedication to sustainable energy practices to customers,
              partners, and stakeholders.
            </li>
            <li>
              <strong>Enhance Competitiveness:</strong> Gain access to new
              markets and strengthen your competitive edge with an internationally
              recognized energy management certification.
            </li>
            <li>
              <strong>Achieve Cost Savings:</strong> Optimize your energy use to
              reduce costs and improve resource efficiency.
            </li>
            <li>
              <strong>Support Climate Protection:</strong> Reduce greenhouse gas
              emissions and contribute to global efforts in combating climate
              change.
            </li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Our ISO 50001 Services Include:
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>
              <strong>Certification Audits:</strong> Comprehensive evaluations to
              assess the conformity and effectiveness of your Energy Management
              System.
            </li>
            <li>
              <strong>Issuance of ISO 50001 Certificates:</strong> Official
              certification of your company’s compliance with ISO 50001
              requirements.
            </li>
            <li>
              <strong>Ongoing Support:</strong> Surveillance and recertification
              audits to ensure that your system remains compliant and effective
              over time.
            </li>
          </ul>
        </div>

        {/* Additional Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Additional Services
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Beyond certification, <span className="font-semibold">French Cert</span> also offers
            training, inspections, and testing services to help you maintain the
            highest standards in energy management. With our support, you can
            improve energy performance, strengthen stakeholder trust, and increase
            your marketability.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Let French Cert Help You Improve Your Energy Efficiency
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            We look forward to helping you improve your energy efficiency with
            ISO 50001 certification and can provide you with a customized offer
            to meet your needs.
          </p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default ISO50001;