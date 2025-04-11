import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { 
  FaBuilding, FaGlobe, FaTag, FaUsers, FaEnvelope, FaPhone, 
  FaMapMarkerAlt, FaEdit, FaTrash, FaArrowLeft, FaIdCard,
  FaCalendarAlt, FaThList, FaGraduationCap, FaCertificate,
  FaSpinner, FaExclamationTriangle
} from 'react-icons/fa';
import { BASE_URL } from "../../../secrets";

const CompanyView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [activeTab, setActiveTab] = useState('details');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);
          
          // Always fetch company data first
          const companyRes = await axios.get(`${BASE_URL}/api/companies/${id}`);
          
          if (!companyRes.data.success) {
            throw new Error('Company not found');
          }
      
          setCompany(companyRes.data.data);
      
          // Now try to fetch certifications and trainings, but don't fail if they error
          try {
            const certificationsRes = await axios.get(`${BASE_URL}/api/company-certifications/company/${id}`);
            setCertifications(certificationsRes.data.success ? certificationsRes.data.data : []);
          } catch (certError) {
            console.error('Error fetching certifications:', certError);
            setCertifications([]);
          }
      
          try {
            const trainingsRes = await axios.get(`${BASE_URL}/api/company-trainings/company/${id}`);
            setTrainings(trainingsRes.data.success ? trainingsRes.data.data : []);
          } catch (trainingError) {
            console.error('Error fetching trainings:', trainingError);
            setTrainings([]);
          }
      
        } catch (error) {
          console.error('Error fetching company data:', error);
          setError(error.response?.data?.message || error.message || 'Failed to load company data');
          toast.error(error.response?.data?.message || 'Failed to load company data');
          
          if (error.response?.status === 404) {
            navigate('/admin/companies', { replace: true });
          }
        } finally {
          setLoading(false);
        }
      };

    fetchData();
  }, [id, navigate]);

  const handleDeleteCompany = async () => {
    if (!window.confirm('Are you sure you want to delete this company and all associated data? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await axios.delete(`${BASE_URL}/api/companies/${id}`);
      
      if (response.data.success) {
        toast.success('Company deleted successfully');
        navigate('/admin/companies');
      } else {
        throw new Error(response.data.message || 'Failed to delete company');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to delete company');
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
      <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-8 text-center">
          <FaExclamationTriangle className="mx-auto text-yellow-500 text-4xl mb-4" />
          <h2 className="text-2xl font-bold text-yellow-800 mb-2">Error Loading Company</h2>
          <p className="text-yellow-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors"
          >
            Try Again
          </button>
          <Link
            to="/admin/companies"
            className="ml-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
          >
            Back to Companies
          </Link>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Company Not Found</h2>
          <Link 
            to="/admin/companies" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Companies List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl mx-auto">
      {/* Header with company name and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <FaBuilding className="text-blue-600 text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{company.name}</h1>
            <div className="text-sm text-gray-500 flex items-center mt-1">
              <FaIdCard className="mr-1" />
              ID: {company.companyIdentifier}
              <span className="mx-2">•</span>
              <FaCalendarAlt className="mr-1" />
              Added: {new Date(company.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link
            to="/admin/companies"
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center hover:bg-gray-200 transition-colors"
          >
            <FaArrowLeft className="mr-1" />
            Back
          </Link>
          
          <Link
            to={`/admin/companies/edit/${company._id}`}
            className="px-3 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
          >
            <FaEdit className="mr-1" />
            Edit
          </Link>
          
          <button
            onClick={handleDeleteCompany}
            className="px-3 py-2 bg-red-600 text-white rounded-md flex items-center hover:bg-red-700 transition-colors"
          >
            <FaTrash className="mr-1" />
            Delete
          </button>
        </div>
      </div>
      
      {/* Tabs navigation */}
      <div className="border-b mb-6">
        <nav className="flex space-x-6">
          <button
            className={`py-2 px-1 -mb-px font-medium text-sm ${
              activeTab === 'details'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('details')}
          >
            Company Details
          </button>
          
          <button
            className={`py-2 px-1 -mb-px font-medium text-sm flex items-center ${
              activeTab === 'certifications'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('certifications')}
          >
            <FaCertificate className="mr-1" />
            Certifications
            {certifications.length > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                {certifications.length}
              </span>
            )}
          </button>
          
          <button
            className={`py-2 px-1 -mb-px font-medium text-sm flex items-center ${
              activeTab === 'trainings'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('trainings')}
          >
            <FaGraduationCap className="mr-1" />
            Trainings
            {trainings.length > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                {trainings.length}
              </span>
            )}
          </button>
        </nav>
      </div>
      
      {/* Tab content */}
      {activeTab === 'details' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Basic Info */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <FaBuilding className="mr-2 text-blue-600" />
              Company Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Category</div>
                <div className="mt-1 flex items-center">
                  <FaTag className="mr-2 text-blue-600" />
                  <span className="text-gray-800 text-base">{company.category}</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500">Employees</div>
                <div className="mt-1 flex items-center">
                  <FaUsers className="mr-2 text-blue-600" />
                  <span className="text-gray-800 text-base">{company.employeeCount?.toLocaleString()}</span>
                </div>
              </div>
              
              {company.scope && (
                <div>
                  <div className="text-sm font-medium text-gray-500">Scope</div>
                  <div className="mt-1 text-gray-800">{company.scope}</div>
                </div>
              )}
              
              {company.fields && company.fields.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-500">Fields</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {company.fields.map(field => (
                      <span 
                        key={field._id || field} 
                        className="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded-md flex items-center"
                      >
                        <FaThList className="mr-1" />
                        {typeof field === 'object' ? field.name : field}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <div className="text-sm font-medium text-gray-500">Origin Country</div>
                <div className="mt-1 flex items-center">
                  <FaGlobe className="mr-2 text-blue-600" />
                  <span className="text-gray-800 text-base">{company.originCountry}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <FaEnvelope className="mr-2 text-blue-600" />
              Contact Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Email</div>
                <a 
                  href={`mailto:${company.email}`} 
                  className="mt-1 flex items-center text-blue-600 hover:underline"
                >
                  <FaEnvelope className="mr-2" />
                  <span>{company.email}</span>
                </a>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500">Phone</div>
                <a 
                  href={`tel:${company.phone}`} 
                  className="mt-1 flex items-center text-blue-600 hover:underline"
                >
                  <FaPhone className="mr-2" />
                  <span>{company.phone}</span>
                </a>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500">Address</div>
                <div className="mt-1">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="mr-2 mt-1 text-blue-600" />
                    <div>
                      <div className="text-gray-800">{company.address?.street}</div>
                      <div className="text-gray-800">
                        {company.address?.city}, {company.address?.postalCode}
                      </div>
                      <div className="text-gray-800">{company.address?.country}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'certifications' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaCertificate className="mr-2 text-blue-600" />
              Certifications
            </h2>
            
            <Link
              to={`/admin/companies/${company._id}/add-certification`}
              className="px-3 py-2 bg-green-600 text-white text-sm rounded-md flex items-center hover:bg-green-700 transition-colors"
            >
              <FaCertificate className="mr-1" />
              Add Certification
            </Link>
          </div>
          
          {certifications.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md p-8 text-center">
              <FaCertificate className="mx-auto text-gray-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Certifications</h3>
              <p className="text-gray-500 mb-4">
                This company does not have any certifications recorded yet.
              </p>
              <Link
                to={`/admin/companies/${company._id}/add-certification`}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add First Certification
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Certificate Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issued By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issue Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {certifications.map(cert => (
                    <tr key={cert._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaCertificate className="text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{cert.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cert.issuedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cert.expiryDate ? new Date(cert.expiryDate).toLocaleDateString() : 'No Expiry'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link 
                            to={`/certifications/${cert._id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <FaEye />
                          </Link>
                          <Link 
                            to={`/admin/certifications/edit/${cert._id}`}
                            className="text-green-600 hover:text-green-900"
                            title="Edit Certification"
                          >
                            <FaEdit />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'trainings' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaGraduationCap className="mr-2 text-blue-600" />
              Trainings
            </h2>
            
            <Link
              to={`/admin/companies/${company._id}/add-training`}
              className="px-3 py-2 bg-green-600 text-white text-sm rounded-md flex items-center hover:bg-green-700 transition-colors"
            >
              <FaGraduationCap className="mr-1" />
              Add Training
            </Link>
          </div>
          
          {trainings.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md p-8 text-center">
              <FaGraduationCap className="mx-auto text-gray-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Trainings</h3>
              <p className="text-gray-500 mb-4">
                This company does not have any trainings recorded yet.
              </p>
              <Link
                to={`/admin/companies/${company._id}/add-training`}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add First Training
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Training Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {trainings.map(training => (
                    <tr key={training._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaGraduationCap className="text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{training.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {training.provider}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(training.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(training.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link 
                            to={`/trainings/${training._id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <FaEye />
                          </Link>
                          <Link 
                            to={`/trainings/edit/${training._id}`}
                            className="text-green-600 hover:text-green-900"
                            title="Edit Training"
                          >
                            <FaEdit />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyView;