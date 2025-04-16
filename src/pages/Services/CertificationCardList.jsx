import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSpinner, FaSearch, FaCertificate } from "react-icons/fa";
import { BASE_URL } from "../../secrets";

// Helper function to strip HTML tags and limit words
const formatDescription = (html, wordLimit = 20) => {
  if (!html) return '';
  
  // Remove HTML tags
  const plainText = html.replace(/<[^>]*>/g, '');
  
  // Split into words and limit
  const words = plainText.split(/\s+/);
  if (words.length <= wordLimit) return plainText;
  
  return words.slice(0, wordLimit).join(' ') + '...';
};

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

  // Initial data loading
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
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Our Certifications
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of certifications designed to elevate your business standards and ensure compliance with international requirements.
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-grow max-w-xl">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search certifications..."
              className="pl-10 pr-4 py-3 border-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
            />

          </div>

          <select
            className="py-3 px-4 border-2 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 bg-white transition-all"
            value={selectedType}
            onChange={(e) => setState(prev => ({ ...prev, selectedType: e.target.value }))}
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
                className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Reset Filters
              </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
          </div>
        ) : certifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
            <FaCertificate className="text-5xl mx-auto mb-4 text-gray-300" />
            <h3 className="text-2xl font-semibold mb-2">No certifications found</h3>
            <p>Try adjusting your search criteria or explore all our certifications.</p>
            <button
            onClick={handleResetFilters}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset Filters
          </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <Link 
                to={`/certification-cards/${cert._id}`} 
                key={cert._id}
                className="block transition-transform duration-300 hover:transform hover:scale-105"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  <div className="px-6 py-8 flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{cert.name}</h3>
                      <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 whitespace-nowrap ml-2">
                        {cert.certificationType}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      {cert.shortDescription}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="font-medium">Duration:</span>
                        <span className="ml-2">{cert.durationInMonths} months</span>
                      </div>
                      
                      {cert.fields && cert.fields.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {cert.fields.slice(0, 3).map((field) => (
                            <span 
                              key={field._id}
                              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                            >
                              {field.name}
                            </span>
                          ))}
                          {cert.fields.length > 3 && (
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                              +{cert.fields.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t">
                    <span className="text-blue-600 font-medium flex items-center justify-center">
                      Learn more
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationCardList;