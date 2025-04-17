import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSpinner, FaClock, FaChevronLeft, FaTag } from "react-icons/fa";
import { BASE_URL } from "../../secrets";

const CertificationDetail = () => {
  const { id } = useParams();
  const [certification, setCertification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedCertifications, setRelatedCertifications] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [certRes, relatedRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/certifications/public/${id}`),
          axios.get(`${BASE_URL}/api/certifications/public/list`, {
            params: { limit: 3, exclude: id }
          })
        ]);

        if (certRes.data.success) {
          setCertification(certRes.data.data);
        } else {
          throw new Error('Failed to load certification details');
        }

        if (relatedRes.data.success) {
          setRelatedCertifications(relatedRes.data.data.certifications);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "An error occurred while loading the certification");
        toast.error(err.response?.data?.message || "Failed to load certification details");
      } finally {
        setLoading(false);
        setLoadingRelated(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-gray-600">Loading certification details...</p>
      </div>
    );
  }

  if (error || !certification) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Certification Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The certification you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            to="/certification-cards"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <FaChevronLeft className="mr-2" /> Back to Certifications
          </Link>
        </div>
      </div>
    );
  }

  // Custom CSS for rich text formatting
  const richTextStyles = `
    .certification-content {
      line-height: 1.6;
      color: #374151;
    }
    .certification-content h1 {
      font-size: 2em;
      margin: 1em 0 0.5em;
      font-weight: 600;
      color: #111827;
    }
    .certification-content h2 {
      font-size: 1.5em;
      margin: 1em 0 0.5em;
      font-weight: 600;
      color: #111827;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 0.3em;
    }
    .certification-content h3 {
      font-size: 1.25em;
      margin: 1em 0 0.5em;
      font-weight: 600;
      color: #111827;
    }
    .certification-content p {
      margin-bottom: 1em;
    }
    .certification-content ul, 
    .certification-content ol {
      margin-bottom: 1em;
      padding-left: 1.5em;
    }
    .certification-content ul {
      list-style-type: disc;
    }
    .certification-content ol {
      list-style-type: decimal;
    }
    .certification-content li {
      margin-bottom: 0.5em;
    }
    .certification-content a {
      color: #3b82f6;
      text-decoration: underline;
    }
    .certification-content a:hover {
      color: #2563eb;
    }
    .certification-content strong {
      font-weight: 600;
    }
    .certification-content em {
      font-style: italic;
    }
    .certification-content u {
      text-decoration: underline;
    }
    .certification-content .text-align-left {
      text-align: left;
    }
    .certification-content .text-align-center {
      text-align: center;
    }
    .certification-content .text-align-right {
      text-align: right;
    }
    .certification-content .text-align-justify {
      text-align: justify;
    }
    .certification-content img {
      max-width: 100%;
      height: auto;
      margin: 1em 0;
      border-radius: 0.5rem;
    }
  `;

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <style dangerouslySetInnerHTML={{ __html: richTextStyles }} />
      
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <Link
          to="/certification-cards"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
        >
          <FaChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
          Back to All Certifications
        </Link>

        {/* Main certification card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-3">
                  <FaTag className="mr-1" />
                  {certification.certificationType}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {certification.name}
                </h1>
              </div>

              <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                <FaClock className="mr-2" />
                <span>{certification.durationInMonths} month program</span>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-lg text-gray-600">{certification.shortDescription}</p>
            </div>

            <div 
              className="certification-content"
              dangerouslySetInnerHTML={{ __html: certification.description }}
            />
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8 md:p-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {certification.callToAction}
            </h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Ready to get certified in {certification.certificationType}? 
              Our experts will guide you through the entire process.
            </p>
            <button className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
              Get Started Now
            </button>
          </div>
        </div>

        {/* Related Certifications */}
        {relatedCertifications.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You might also be interested in
            </h2>
            {loadingRelated ? (
              <div className="flex justify-center">
                <FaSpinner className="animate-spin text-2xl text-blue-500" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedCertifications.map((cert) => (
                  <Link
                    to={`/certification-cards/${cert._id}`}
                    key={cert._id}
                    className="block transition-transform duration-300 hover:transform hover:scale-[1.02]"
                  >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                      <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <div className="p-6 flex-grow">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                            {cert.name}
                          </h3>
                          <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 whitespace-nowrap ml-2">
                            {cert.certificationType}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {cert.shortDescription}
                        </p>
                        <div className="mt-auto">
                          <div className="flex items-center text-sm text-gray-500">
                            <FaClock className="mr-1" />
                            <span>{cert.durationInMonths} months</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationDetail;