import React from "react";

const ISO22000 = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          ISO 22000 Certification – Ensuring Food Safety and Quality for Your Success
        </h1>

        {/* Introduction Section */}
        <div className="mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            At <span className="font-semibold text-blue-800">French Cert</span>,
            we offer comprehensive ISO 22000 certification services to help
            businesses establish and maintain effective Food Safety Management
            Systems (FSMS). ISO 22000 is an internationally recognized standard
            that ensures the safety and quality of food products throughout the
            entire supply chain, essential for gaining the trust of your
            customers and enhancing your market competitiveness.
          </p>
        </div>

        {/* Why Choose ISO 22000 Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Why ISO 22000 Certification?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            ISO 22000 certification brings significant benefits to your
            organization. By achieving certification, you can:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 mt-4">
            <li>
              <strong>Ensure Food Safety:</strong> Comply with ISO 22000 to
              safeguard your food products and protect consumers from health
              risks across the entire supply chain.
            </li>
            <li>
              <strong>Achieve Compliance:</strong> Certification ensures your
              business meets all relevant legal and regulatory food safety
              requirements, adhering to global best practices.
            </li>
            <li>
              <strong>Build Customer Trust:</strong> With the ISO 22000
              certificate, you demonstrate your commitment to the highest
              standards of quality, transparency, and safety to customers and
              business partners.
            </li>
            <li>
              <strong>Enhance Efficiency:</strong> A robust management system
              improves your operational processes, reduces risks, and leads to
              cost savings.
            </li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Our ISO 22000 Services Include:
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>
              <strong>Certification Audits:</strong> Comprehensive assessments to
              evaluate the effectiveness and compliance of your Food Safety
              Management System.
            </li>
            <li>
              <strong>Issuance of ISO 22000 Certificates:</strong> Official
              certification of your company’s adherence to food safety and
              quality standards.
            </li>
            <li>
              <strong>Ongoing Support:</strong> Follow-up activities, including
              surveillance and recertification audits, to ensure continuous
              compliance and optimal performance.
            </li>
          </ul>
        </div>

        {/* Commitment Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Our Commitment to Your Success:
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>
              <strong>Customized Solutions:</strong> We tailor our services to
              meet the specific needs of your business, ensuring the best results
              for your food safety management system.
            </li>
            <li>
              <strong>Expertise:</strong> Our experienced auditors have in-depth
              knowledge of food safety management, ensuring a thorough and
              effective certification process.
            </li>
            <li>
              <strong>Smooth Process:</strong> We work efficiently to minimize
              disruptions to your business operations, enabling a smooth
              certification experience and prompt delivery of your certificate.
            </li>
          </ul>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Let French Cert Guide You to Food Safety Excellence
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Achieving ISO 22000 certification can significantly increase customer
            trust and give you a competitive edge, ensuring the safety, quality,
            and reliability of your food products. Let French Cert guide you
            through the process and help you secure the ISO 22000 certification
            that guarantees success in the food industry.
          </p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default ISO22000;