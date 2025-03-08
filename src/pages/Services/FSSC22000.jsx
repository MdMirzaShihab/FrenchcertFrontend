import React from "react";

const FSSC22000 = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          FSSC 22000 Certification – Ensuring Food Safety and Quality for Your Success
        </h1>

        {/* Introduction Section */}
        <div className="mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            At <span className="font-semibold text-blue-800">French Cert</span>,
            we are proud to offer comprehensive FSSC 22000 certification
            services, focusing on optimizing food safety and quality management
            systems. As a globally recognized standard, FSSC 22000 integrates ISO
            22000 with additional technical specifications for food production,
            ensuring effective and efficient management of food safety across the
            supply chain.
          </p>
        </div>

        {/* Why Choose FSSC 22000 Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why Choose FSSC 22000 Certification?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            FSSC 22000 certification is crucial for businesses in the food
            industry to ensure the highest standards of food safety, traceability,
            and transparency. It is designed to help organizations meet growing
            demands for safe food production, while demonstrating their
            commitment to quality and risk management.
          </p>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Our FSSC 22000 Services Include:
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>
              <strong>Comprehensive Audits:</strong> Our skilled auditors evaluate
              all aspects of your operations, identifying potential weaknesses
              and ensuring your food safety practices are in compliance.
            </li>
            <li>
              <strong>FSSC 22000 Certification:</strong> We provide official
              certification based on your demonstrated compliance with the
              requirements of the standard.
            </li>
            <li>
              <strong>Training and Workshops:</strong> We offer tailored training
              and workshops to raise awareness of FSSC 22000 requirements,
              ensuring your team is fully equipped to maintain high food safety
              standards.
            </li>
          </ul>
        </div>

        {/* Benefits Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Benefits with FSSC 22000 Certification:
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>
              <strong>Trust and Credibility:</strong> FSSC 22000 certification
              showcases your commitment to food safety and quality, building
              trust with customers and business partners.
            </li>
            <li>
              <strong>Risk Mitigation:</strong> By identifying and addressing
              risks within your processes, certification minimizes the likelihood
              of production failures and costly recalls.
            </li>
            <li>
              <strong>Competitive Advantage:</strong> Certification sets you
              apart from competitors, providing access to new business
              opportunities and strengthening your position in the market.
            </li>
            <li>
              <strong>Continuous Improvement:</strong> FSSC 22000 promotes a
              culture of ongoing improvement, driving higher efficiency, better
              risk management, and enhanced customer satisfaction.
            </li>
          </ul>
        </div>

        {/* Why French Cert Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why French Cert?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our team of experienced auditors specializes in various food industry
            sectors, including production, processing, packaging, and logistics.
            We understand the unique challenges you face and provide tailored
            solutions that align with your specific needs, ensuring a seamless
            and successful certification process.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Let French Cert Guide You to Food Safety Excellence
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Let French Cert guide you on the path to achieving FSSC 22000
            certification and optimizing your food safety and quality management
            systems for long-term success.
          </p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default FSSC22000;