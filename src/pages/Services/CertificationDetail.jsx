import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaSpinner, FaClock, FaChevronLeft, FaTag } from "react-icons/fa";
import { BASE_URL } from "../../secrets";

const CertificationDetail = () => {
  const { id } = useParams();
  const [certification, setCertification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertification = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/certifications/${id}`);
        
        if (response.data.success) {
          setCertification(response.data.data);
        } else {
          setError("Failed to load certification details");
        }
      } catch (error) {
        console.error("Error fetching certification:", error);
        setError("An error occurred while loading the certification");
      } finally {
        setLoading(false);
      }
    };

    fetchCertification();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error || !certification) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Certification Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The certification you're looking for doesn't exist or has been removed."}</p>
          <Link 
            to="/certification-cards" 
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Certifications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/certification-cards" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <FaChevronLeft className="mr-2" /> Back to All Certifications
        </Link>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{certification.name}</h1>
              
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm md:text-base font-medium">
                {certification.certificationType}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center text-gray-600">
                <FaClock className="mr-2" />
                <span>{certification.durationInMonths} months</span>
              </div>
              
              {certification.fields && certification.fields.length > 0 && (
                <div className="flex items-center text-gray-600">
                  <FaTag className="mr-2" />
                  <div className="flex flex-wrap gap-2">
                    {certification.fields.map((field) => (
                      <span 
                        key={field._id}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100"
                      >
                        {field.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="prose prose-lg max-w-none">
              <style jsx>{`
                /* Heading styles */
                .prose h1 {
                  font-size: 2em;
                  margin: 0.67em 0;
                  font-weight: bold;
                  color: #111827;
                }
                .prose h2 {
                  font-size: 1.5em;
                  margin: 0.83em 0;
                  font-weight: bold;
                  color: #111827;
                  border-bottom: 1px solid #e5e7eb;
                  padding-bottom: 0.3em;
                }
                .prose h3 {
                  font-size: 1.17em;
                  margin: 1em 0;
                  font-weight: bold;
                  color: #111827;
                }
                .prose h4 {
                  font-size: 1em;
                  margin: 1.33em 0;
                  font-weight: bold;
                  color: #111827;
                }
                .prose h5 {
                  font-size: 0.83em;
                  margin: 1.67em 0;
                  font-weight: bold;
                  color: #111827;
                }
                .prose h6 {
                  font-size: 0.67em;
                  margin: 2.33em 0;
                  font-weight: bold;
                  color: #111827;
                }

                /* List styles */
                .prose ul {
                  list-style-type: disc;
                  padding-left: 1.5em;
                  margin: 1em 0;
                }
                .prose ol {
                  list-style-type: decimal;
                  padding-left: 1.5em;
                  margin: 1em 0;
                }
                .prose li {
                  margin-bottom: 0.5em;
                }
              `}</style>
              <div 
                className="certification-description"
                dangerouslySetInnerHTML={{ __html: certification.description }}
              />
            </div>
          </div>
        </div>
        
        {/* Call to Action Section */}
        <div className="text-center mt-12 bg-white p-10 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Let French Cert Guide You to a Safer Workplace
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Let us guide you through the {certification.certificationType} certification process and
            ensure the health and safety of your workplace, leading to long-term success.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificationDetail;