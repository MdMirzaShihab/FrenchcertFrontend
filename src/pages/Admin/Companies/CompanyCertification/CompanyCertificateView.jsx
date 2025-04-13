import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaCertificate, 
  FaCalendarAlt, 
  FaBuilding,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaPrint,
  FaEdit,
  FaSpinner,
  FaExclamationTriangle
} from 'react-icons/fa';
import { BASE_URL } from "../../../../secrets";

const CompanyCertificateView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/company-certifications/${id}`);
        
        if (response.data.success) {
          setCertificate(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to load certificate');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load certificate');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const formatAddress = (address) => {
    if (!address) return 'N/A';
    const { street, city, postalCode, country } = address;
    return (
      <div className="space-y-1">
        {street && <div>{street}</div>}
        <div>
          {[city, postalCode].filter(Boolean).join(', ')}
          {country && `, ${country}`}
        </div>
      </div>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-md p-8 text-center">
          <FaExclamationTriangle className="mx-auto text-red-500 text-4xl mb-4" />
          <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Certificate</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            to={`/admin/companies/view/${certificate?.company?._id || ''}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Company
          </Link>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-5xl mx-auto print:p-0 print:shadow-none">
      {/* Header with actions */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b print:hidden">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            <FaCertificate className="inline mr-3 text-blue-600" />
            Certificate Details
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            {certificate.company?.name || 'N/A'}
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Link
            to={`/admin/companies/${certificate.company?._id}/edit-certification/${certificate._id}`}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors flex items-center"
          >
            <FaEdit className="mr-2" />
            Edit Certificate
          </Link>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center"
          >
            <FaPrint className="mr-2" />
            Print
          </button>
          <Link
            to={`/admin/companies/view/${certificate.company?._id}`}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </Link>
        </div>
      </div>
      
      {/* Certificate Content */}
      <div className="space-y-8 print:space-y-6">
        {/* Certificate ID Banner */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-800">
            Certificate ID: {certificate.certificationId || 'N/A'}
          </h2>
          <div className="mt-2 flex items-center">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              certificate.status === 'active' ? 'bg-green-100 text-green-800' :
              certificate.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              certificate.status === 'suspended' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {certificate.status ? 
                certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1) : 
                'N/A'}
            </span>
          </div>
        </div>

        {/* Main Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Company Information Card */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaBuilding className="mr-3 text-blue-600" />
              Company Information
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Company Name</h3>
                <p className="text-lg text-gray-800">{certificate.company?.name || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                  <FaMapMarkerAlt className="mr-1" />
                  Address
                </h3>
                <div className="text-lg text-gray-800">
                  {formatAddress(certificate.company?.address)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Certification Information Card */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaCertificate className="mr-3 text-blue-600" />
              Certification Details
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Certification Type</h3>
                <p className="text-lg text-gray-800">{certificate.certification?.name || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Issued By</h3>
                <p className="text-lg text-gray-800">{certificate.certification?.issuedBy || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dates Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-600" />
              Issue Date
            </h3>
            <p className="text-xl font-medium text-gray-900">
              {formatDate(certificate.issueDate)}
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-600" />
              Expiry Date
            </h3>
            <p className="text-xl font-medium text-gray-900">
              {formatDate(certificate.expiryDate)}
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Validity Period
            </h3>
            <p className="text-xl font-medium text-gray-900">
              {certificate.issueDate && certificate.expiryDate ? (
                <>
                  {Math.ceil(
                    (new Date(certificate.expiryDate) - new Date(certificate.issueDate)) / 
                    (1000 * 60 * 60 * 24 * 365)
                  )} years
                </>
              ) : 'N/A'}
            </p>
          </div>
        </div>

        {/* Surveillance Dates */}
        {(certificate.firstSurveillanceDate || certificate.secondSurveillanceDate) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificate.firstSurveillanceDate && (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  First Surveillance Date
                </h3>
                <p className="text-xl font-medium text-gray-900">
                  {formatDate(certificate.firstSurveillanceDate)}
                </p>
              </div>
            )}
            {certificate.secondSurveillanceDate && (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Second Surveillance Date
                </h3>
                <p className="text-xl font-medium text-gray-900">
                  {formatDate(certificate.secondSurveillanceDate)}
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Notes Section */}
        {certificate.notes && (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Additional Notes
            </h3>
            <div className="prose max-w-none text-gray-800 whitespace-pre-line">
              {certificate.notes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyCertificateView;