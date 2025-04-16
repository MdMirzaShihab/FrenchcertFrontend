import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from "../../secrets";

const CertificationCardList = () => {
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
    showFilters: false
  });

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
    showFilters
  } = state;

  const fetchCertifications = useCallback(async (page = 1) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      const params = {
        page,
        limit: 9, // Show 3 cards per row (3x3 grid)
        ...(searchTerm && { search: searchTerm }),
        ...(selectedType && { type: selectedType }),
        ...(selectedField && { field: selectedField })
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
      toast.error(err.response?.data?.message || 'Failed to fetch certifications');
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [searchTerm, selectedType, selectedField]);

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
        toast.error('Failed to fetch filter options');
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCertifications(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchCertifications]);

  const handleResetFilters = () => {
    setState(prev => ({
      ...prev,
      searchTerm: '',
      selectedType: '',
      selectedField: '',
      currentPage: 1
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Certifications</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Browse through our comprehensive collection of professional certifications to advance your career.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search certifications..."
              value={searchTerm}
              onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
            />
          </div>
          
          <button
            onClick={() => setState(prev => ({ ...prev, showFilters: !prev.showFilters }))}
            className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <FaFilter /> Filters
          </button>
        </div>

        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certification Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setState(prev => ({ ...prev, selectedType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  {certificationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      )}

      {/* Empty State */}
      {!loading && certifications.length === 0 && (
        <div className="bg-white p-12 rounded-xl shadow text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No certifications found</h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Certifications Grid */}
      {!loading && certifications.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {certifications.map((cert) => (
              <div key={cert._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {cert.certificationType}
                    </span>
                    <span className="ml-auto text-sm text-gray-500">
                      {cert.durationInMonths} months
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{cert.shortDescription}</p>
                  <Link
                    to={`/certification-cards/${cert._id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <nav className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => fetchCertifications(i + 1)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CertificationCardList;