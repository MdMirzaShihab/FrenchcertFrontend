import React from "react";

const ISO45001 = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          ISO 45001 Certification – Ensuring Occupational Health and Safety Excellence
        </h1>

        {/* Introduction Section */}
        <div className="mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            At <span className="font-semibold text-blue-800">French Cert</span>,
            we are committed to providing expert certification services for ISO
            45001, the internationally recognized standard for Occupational
            Health and Safety Management Systems (OHSMS). ISO 45001 is designed
            to help organizations create a safe and healthy work environment,
            reduce workplace risks, and demonstrate their commitment to employee
            well-being.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Our team of experienced auditors works with you to verify and enhance
            the effectiveness of your occupational health and safety management
            system, ensuring that it meets the rigorous requirements of ISO 45001
            and helps your organization continuously improve.
          </p>
        </div>

        {/* Why Choose ISO 45001 Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Why Choose ISO 45001 Certification?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            ISO 45001 certification offers numerous benefits for your business,
            including:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 mt-4">
            <li>
              <strong>Enhanced Employee Safety:</strong> By implementing an
              effective OHSMS, you minimize workplace hazards and ensure the
              well-being of your workforce.
            </li>
            <li>
              <strong>Compliance:</strong> Certification ensures your company
              meets all relevant legal requirements and global best practices in
              occupational health and safety.
            </li>
            <li>
              <strong>Improved Reputation:</strong> ISO 45001 certification
              demonstrates your commitment to employee health and safety,
              fostering trust with customers, partners, and employees.
            </li>
            <li>
              <strong>Reduced Costs:</strong> A robust OHSMS helps reduce
              incidents, absenteeism, and insurance costs, leading to significant
              savings.
            </li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Our ISO 45001 Services Include:
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>
              <strong>Certification Audits:</strong> Detailed evaluations to
              assess the conformity and effectiveness of your occupational health
              and safety management system.
            </li>
            <li>
              <strong>Issuance of ISO 45001 Certificates:</strong> Official
              recognition of your organization’s compliance with ISO 45001
              standards.
            </li>
            <li>
              <strong>Ongoing Support:</strong> Surveillance and recertification
              audits to ensure continued compliance and to address evolving
              occupational health and safety needs.
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
              <strong>Tailored Solutions:</strong> We work closely with your team
              to provide a certification process that is customized to meet the
              specific needs of your organization, regardless of size or industry.
            </li>
            <li>
              <strong>Expertise:</strong> Our auditors have in-depth knowledge of
              occupational health and safety management, ensuring a comprehensive
              and effective certification process.
            </li>
            <li>
              <strong>Efficiency:</strong> We make the certification process
              transparent, streamlined, and efficient, minimizing disruptions to
              your business while ensuring thorough evaluations.
            </li>
          </ul>
        </div>

        {/* Additional Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Additional Services
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At <span className="font-semibold">French Cert</span>, we don’t just
            provide ISO 45001 certification. We also offer additional services,
            including training, inspections, and testing, to help you maintain
            the highest standards in occupational health and safety. With our
            support, you can strengthen trust with your employees, partners, and
            customers, while enhancing your competitiveness in the marketplace.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Let French Cert Guide You to a Safer Workplace
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Let us guide you through the ISO 45001 certification process and
            ensure the health and safety of your workplace, leading to long-term
            success.
          </p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default ISO45001;