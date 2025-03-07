import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-red-400 mb-4">About Us</h3>
            <p className="text-gray-300">
              We are a leading provider of certification, training, and accreditation services. Our mission is to empower organizations with the knowledge and credentials they need to succeed.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/validate" className="text-gray-300 hover:text-red-500 transition-colors duration-300">
                Certificate Validation
                </a>
              </li>
              <li>
                <a href="/training" className="text-gray-300 hover:text-red-500 transition-colors duration-300">
                  Training Programs
                </a>
              </li>
              <li>
                <a href="/accreditations" className="text-gray-300 hover:text-red-500 transition-colors duration-300">
                  Accreditations
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-red-500 transition-colors duration-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Armstrong House, First Avenue, Robin Hood Airport</li>
              <li>Doncaster, South Yorkshire, DN9 3GA, U.K.</li>
              <li>Email: 	info@frenchcert.org</li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-500 transition-colors duration-300"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-500 transition-colors duration-300"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-500 transition-colors duration-300"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-500 transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-500 my-8"></div>

        {/* Copyright Section */}
        <div className="text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} French Cert UK LTD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;