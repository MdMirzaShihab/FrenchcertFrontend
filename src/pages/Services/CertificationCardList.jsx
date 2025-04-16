import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSpinner, FaSearch, FaCertificate } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { BASE_URL } from "../../secrets";

const CertificationCardList = () => {
  // State management
  const [state, setState] = useState({
    certifications: [],
    loading: true,
    searchTerm: "",
    currentPage: 1,
    totalPages: 1,
    certificationTypes: [],
    selectedType: "",
    error: null
  });

  // Destructure state
  const { 
    certifications, 
    loading, 
    searchTerm, 
    currentPage, 
    totalPages, 
    certificationTypes, 
    selectedType,
    error
  } = state;

  // Fetch certifications with memoization
  const fetchCertifications = useCallback(async (page = 1) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const params = {
        page,
        limit: 9,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedType && { type: selectedType })
      };

      const response = await axios.get(`${BASE_URL}/api/certifications/public/list`, { params });
      
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
  }, [searchTerm, selectedType]);

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [typesRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/certifications/types/list`)
        ]);
        
        setState(prev => ({
          ...prev,
          certificationTypes: typesRes.data.data
        }));
      } catch (err) {
        toast.error(`Failed to fetch certification types, ${err.message}`);
      }
    };

    fetchInitialData();
  }, []);

  // Debounced fetch when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCertifications(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchCertifications]);

  // Handlers
  const handleResetFilters = () => {
    setState(prev => ({
      ...prev,
      searchTerm: '',
      selectedType: '',
      currentPage: 1
    }));
  };

  const handlePageChange = (page) => {
    setState(prev => ({ ...prev, currentPage: page }));
    fetchCertifications(page);
  };

  // UI Components
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-20">
      <FaSpinner className="animate-spin text-4xl text-blue-500" />
    </div>
  );

  const EmptyState = () => (
    <div className="bg-white rounded-xl shadow-md p-8 text-center">
      <FaCertificate className="text-5xl mx-auto mb-4 text-gray-300" />
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        No certifications found
      </h3>
      <p className="text-gray-600 mb-6">
        Try adjusting your search criteria or explore all our certifications.
      </p>
      <button
        onClick={handleResetFilters}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Reset Filters
      </button>
    </div>
  );

  const ErrorMessage = () => (
    error && (
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
    )
  );

  const CertificationCard = ({ cert }) => (
    <Link
      to={`/certification-cards/${cert._id}`}
      className="block transition-transform duration-300 hover:transform hover:scale-[1.02] focus:scale-[1.02] focus:outline-none"
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="px-6 py-8 flex-grow">
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
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <span className="font-medium">Duration:</span>
              <span className="ml-2">
                {cert.durationInMonths} months
              </span>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t">
          <span className="text-blue-600 font-medium flex items-center justify-center group">
            Learn more
            <svg
              className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Our Certifications
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of certifications designed to
            elevate your business standards and ensure compliance with
            international requirements.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search certifications..."
              className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) =>
                setState(prev => ({ ...prev, searchTerm: e.target.value }))
              }
            />
          </div>

          <select
            className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            value={selectedType}
            onChange={(e) =>
              setState(prev => ({ ...prev, selectedType: e.target.value }))
            }
          >
            <option value="">All Certification Types</option>
            {certificationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button
            onClick={handleResetFilters}
            className="px-4 py-3 text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset Filters
          </button>
        </div>

        {/* Error Message */}
        <ErrorMessage />

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : certifications.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {certifications.map((cert) => (
                <CertificationCard key={cert._id} cert={cert} />
              ))}
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-8"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CertificationCardList;