import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { 
  FaCertificate, FaEdit, FaEye, FaTrash, FaSpinner, 
  FaExclamationTriangle, FaFilter, FaTimes, FaCalendarAlt
} from 'react-icons/fa';
import { BASE_URL } from "../../../secrets";

const CompanyCertifications = ({ companyId }) => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    expiryStart: '',
    expiryEnd: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const fetchCertifications = async (filterParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query string for filters
      const queryParams = new URLSearchParams();
      queryParams.append('company', companyId);
      
      if (filterParams.status) {
        queryParams.append('status', filterParams.status);
      }
      
      if (filterParams.expiryStart) {
        queryParams.append('expiryStart', filterParams.expiryStart);
      }
      
      if (filterParams.expiryEnd) {
        queryParams.append('expiryEnd', filterParams.expiryEnd);
      }
      
      const certificationsRes = await axios.get(`${BASE_URL}/api/company-certifications?${queryParams.toString()}`);
      
      if (certificationsRes.data.success) {
        setCertifications(certificationsRes.data.data);
      } else {
        throw new Error(certificationsRes.data.message || 'Failed to load certifications');
      }
    } catch (certError) {
      console.error('Error fetching certifications:', certError);
      setError(certError.response?.data?.message || certError.message || 'Failed to load certifications');
      setCertifications([]);
      toast.error('Failed to load certifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, [companyId]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    fetchCertifications(filters);
  };

  const resetFilters = () => {
    setFilters({
      status: '',
      expiryStart: '',
      expiryEnd: ''
    });
    fetchCertifications({});
  };

  const handleDeleteCertification = async (certId) => {
    if (!window.confirm('Are you sure you want to delete this certification?')) {
      return;
    }

    try {
      const response = await axios.delete(`${BASE_URL}/api/company-certifications/${certId}`);
      
      if (response.data.success) {
        toast.success('Certification deleted successfully');
        // Refresh the list
        fetchCertifications(filters);
      } else {
        throw new Error(response.data.message || 'Failed to delete certification');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to delete certification');
    }
  };

  // Format date for better display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    return date.toLocaleDateString();
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6 text-center">
        <FaExclamationTriangle className="mx-auto text-yellow-500 text-4xl mb-4" />
        <h2 className="text-xl font-bold text-yellow-800 mb-2">Error Loading Certifications</h2>
        <p className="text-yellow-600 mb-4">{error}</p>
        <button
          onClick={() => fetchCertifications()}
          className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <FaCertificate className="mr-2 text-blue-600" />
          Certifications
        </h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-md flex items-center hover:bg-blue-200 transition-colors"
          >
            <FaFilter className="mr-1" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          <Link
            to={`/admin/companies/${companyId}/add-certification`}
            className="px-3 py-2 bg-green-600 text-white text-sm rounded-md flex items-center hover:bg-green-700 transition-colors"
          >
            <FaCertificate className="mr-1" />
            Add Certification
          </Link>
        </div>
      </div>
      
      {/* Filters panel */}
      {showFilters && (
        <div className="bg-gray-50 p-4 mb-4 rounded-lg border border-gray-200">
          <form onSubmit={applyFilters} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="inline mr-1" />
                Expiry From
              </label>
              <input
                type="date"
                name="expiryStart"
                value={filters.expiryStart}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="inline mr-1" />
                Expiry To
              </label>
              <input
                type="date"
                name="expiryEnd"
                value={filters.expiryEnd}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-end space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
              
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
              >
                <FaTimes className="mr-1" />
                Reset
              </button>
            </div>
          </form>
        </div>
      )}
      
      {certifications.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md p-8 text-center">
          <FaCertificate className="mx-auto text-gray-400 text-4xl mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Certifications</h3>
          <p className="text-gray-500 mb-4">
            {filters.status || filters.expiryStart || filters.expiryEnd
              ? 'No certifications match the current filters.'
              : 'This company does not have any certifications recorded yet.'}
          </p>
          {filters.status || filters.expiryStart || filters.expiryEnd ? (
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-2"
            >
              Clear Filters
            </button>
          ) : null}
          <Link
            to={`/admin/companies/${companyId}/add-certification`}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
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
                  Certificate ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
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
                      <span className="text-sm font-medium text-gray-900">
                        {cert.certification?.name || 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cert.certificationId || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(cert.issueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(cert.expiryDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(cert.status)}`}>
                      {cert.status ? cert.status.charAt(0).toUpperCase() + cert.status.slice(1) : 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link 
                        to={`/admin/company-certifications/${cert._id}`}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <FaEye />
                      </Link>
                      <Link 
                        to={`/admin/companies/${companyId}/edit-certification/${cert._id}`}
                        className="text-green-600 hover:text-green-900"
                        title="Edit Certification"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteCertification(cert._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Certification"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompanyCertifications;