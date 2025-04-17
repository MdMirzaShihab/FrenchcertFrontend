import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaSpinner, FaEye } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "../../../components/Pagination";
import { BASE_URL } from "../../../secrets";

const CertificationList = () => {
  // State management
  const [state, setState] = useState({
    certifications: [],
    loading: true,
    searchTerm: '',
    currentPage: 1,
    totalPages: 1,
    certificationTypes: [],
    fields: [],
    selectedType: '',
    selectedField: '',
    error: null
  });

  // Destructure state for cleaner code
  const { 
    certifications, 
    loading, 
    searchTerm, 
    currentPage, 
    totalPages, 
    certificationTypes, 
    fields, 
    selectedType, 
    selectedField,
    error 
  } = state;

  // Memoized fetch function
  const fetchCertifications = useCallback(async (page = 1) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const params = {
        page,
        limit: 10,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedType && { type: selectedType }),
        ...(selectedField && { field: selectedField })
      };

      const response = await axios.get(`${BASE_URL}/api/certifications`, { params });
      
      setState(prev => ({
        ...prev,
        certifications: response.data.data.certifications,
        totalPages: response.data.data.pages,
        currentPage: page,
        loading: false
      }));
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch certifications';
      setState(prev => ({ ...prev, loading: false, error: errorMsg }));
      toast.error(errorMsg);
    }
  }, [searchTerm, selectedType, selectedField]);

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [typesRes, fieldsRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/certifications/types/list`),
          axios.get(`${BASE_URL}/api/fields`)
        ]);
        
        setState(prev => ({
          ...prev,
          certificationTypes: typesRes.data.data,
          fields:  fieldsRes.data.data?.fields 
        }));
      } catch (err) {
        toast.error(`Failed to fetch filter options: ${err.message}`);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch certifications when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCertifications(1);
    }, 300); // Debounce to avoid rapid API calls

    return () => clearTimeout(timer);
  }, [fetchCertifications]);

  // Handlers
  const handleResetFilters = () => {
    setState(prev => ({
      ...prev,
      searchTerm: '',
      selectedType: '',
      selectedField: '',
      currentPage: 1
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      try {
        await axios.delete(`${BASE_URL}/api/certifications/${id}`);
        toast.success('Certification deleted successfully');
        fetchCertifications(currentPage);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete certification');
      }
    }
  };

  // UI Components
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
      <FaSpinner className="animate-spin text-4xl text-blue-500" />
    </div>
  );

  const ErrorMessage = () => (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="bg-white p-8 rounded-lg shadow text-center">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">No certifications found</h3>
      <p className="mt-1 text-sm text-gray-500">
        Try adjusting your search or filter to find what you're looking for.
      </p>
      <div className="mt-6">
        <button
          onClick={handleResetFilters}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-bold text-gray-900">Certification Management</h1>
          <Link
            to="/admin/certifications/add"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPlus className="mr-2" /> Add Certification
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                placeholder="Search certifications..."
                value={searchTerm}
                onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
              />
            </div>

            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedType}
              onChange={(e) => setState(prev => ({ ...prev, selectedType: e.target.value }))}
            >
              <option value="">All Types</option>
              {certificationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedField}
              onChange={(e) => setState(prev => ({ ...prev, selectedField: e.target.value }))}
            >
              <option value="">All Fields</option>
              {fields.map((field) => (
                <option key={field._id} value={field._id}>
                  {field.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleResetFilters}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <ErrorMessage />}

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : certifications.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name & Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fields
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {certifications.map((cert) => (
                    <tr key={cert._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{cert.name}</div>
                            <div className="text-sm text-gray-500 line-clamp-2">
                              {cert.shortDescription}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {cert.certificationType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {cert.fields?.map((field) => (
                            <span
                              key={field._id}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {field.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cert.durationInMonths} months
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/admin/certifications/view/${cert._id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="View"
                          >
                            <FaEye className="h-5 w-5" />
                          </Link>
                          <Link
                            to={`/admin/certifications/edit/${cert._id}`}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            title="Edit"
                          >
                            <FaEdit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(cert._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                            title="Delete"
                          >
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Using the Pagination component */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setState(prev => ({ ...prev, currentPage: page }));
                  fetchCertifications(page);
                }}
                className="px-4 py-3 bg-gray-50 border-t border-gray-200"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationList;