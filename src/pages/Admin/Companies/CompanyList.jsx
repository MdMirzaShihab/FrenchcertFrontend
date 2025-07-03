import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaBuilding, FaPlus, FaSearch, FaEdit, FaTrash, FaSpinner, FaEye, FaGlobe, FaTag, FaUsers } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "../../../components/Pagination";
import { BASE_URL } from "../../../secrets";

const CompanyList = () => {
  // State management
  const [state, setState] = useState({
    companies: [],
    loading: true,
    searchTerm: '',
    currentPage: 1,
    totalPages: 1,
    countries: [],
    categories: [],
    fields: [],
    selectedCountry: '',
    selectedCategory: '',
    selectedField: '',
    minEmployees: '',
    maxEmployees: '',
    error: null
  });

  // Destructure state for cleaner code
  const { 
    companies, 
    loading, 
    searchTerm, 
    currentPage, 
    totalPages, 
    countries, 
    categories, 
    fields, 
    selectedCountry, 
    selectedCategory,
    selectedField,
    minEmployees,
    maxEmployees,
    error 
  } = state;

  // Memoized fetch function with enhanced search
  const fetchCompanies = useCallback(async (page = 1) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const params = {
        page,
        limit: 10,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCountry && { country: selectedCountry }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedField && { field: selectedField }),
        ...(minEmployees && { minEmployees: parseInt(minEmployees) }),
        ...(maxEmployees && { maxEmployees: parseInt(maxEmployees) })
      };

      const response = await axios.get(`${BASE_URL}/api/companies`, { params });
      
      setState(prev => ({
        ...prev,
        companies: response.data.data,
        totalPages: response.data.pages,
        currentPage: page,
        loading: false
      }));
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch companies';
      setState(prev => ({ ...prev, loading: false, error: errorMsg }));
      toast.error(errorMsg);
    }
  }, [searchTerm, selectedCountry, selectedCategory, selectedField, minEmployees, maxEmployees]);

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [countriesRes, categoriesRes, fieldsRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/companies/countries/list`),
          axios.get(`${BASE_URL}/api/companies/categories/list`),
          axios.get(`${BASE_URL}/api/fields`)
        ]);
        
        setState(prev => ({
          ...prev,
          countries: countriesRes.data.data || [],
          categories: categoriesRes.data.data || [],
          fields: fieldsRes.data.data?.fields || []
        }));
      } catch (err) {
        toast.error(`Failed to fetch filter options: ${err.message}`);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch companies when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCompanies(1);
    }, 500); // Increased debounce time for better search experience

    return () => clearTimeout(timer);
  }, [fetchCompanies]);

  // Handlers
  const handleResetFilters = () => {
    setState(prev => ({
      ...prev,
      searchTerm: '',
      selectedCountry: '',
      selectedCategory: '',
      selectedField: '',
      minEmployees: '',
      maxEmployees: '',
      currentPage: 1
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company and all its associated data?')) {
      try {
        await axios.delete(`${BASE_URL}/api/companies/${id}`);
        toast.success('Company deleted successfully');
        fetchCompanies(currentPage);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete company');
      }
    }
  };

  // Validate employee count inputs
  const handleEmployeeCountChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || (!isNaN(value) && parseInt(value) >= 0)) {
      setState(prev => ({ ...prev, [name]: value }));
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
      <FaBuilding className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">No companies found</h3>
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
          <h1 className="text-2xl font-bold text-gray-900">Company Management</h1>
          <Link
            to="/companies/add"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPlus className="mr-2" /> Add Company
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
                placeholder="Search companies by name or scope..."
                value={searchTerm}
                onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
              />
            </div>

            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedCountry}
              onChange={(e) => setState(prev => ({ ...prev, selectedCountry: e.target.value }))}
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedCategory}
              onChange={(e) => setState(prev => ({ ...prev, selectedCategory: e.target.value }))}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
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
          </div>

          {/* Employee count filters */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
            <div>
              <label htmlFor="minEmployees" className="block text-sm font-medium text-gray-700 mb-1">
                Min Employees
              </label>
              <input
                type="number"
                id="minEmployees"
                name="minEmployees"
                min="1"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                placeholder="Minimum"
                value={minEmployees}
                onChange={handleEmployeeCountChange}
              />
            </div>
            <div>
              <label htmlFor="maxEmployees" className="block text-sm font-medium text-gray-700 mb-1">
                Max Employees
              </label>
              <input
                type="number"
                id="maxEmployees"
                name="maxEmployees"
                min="1"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                placeholder="Maximum"
                value={maxEmployees}
                onChange={handleEmployeeCountChange}
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
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
        ) : companies.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employees
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {companies.map((company) => (
                    <tr key={company._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaBuilding className="text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{company.name}</div>
                            <div className="text-sm text-gray-500">ID: {company.companyIdentifier}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-900">
                          <FaGlobe className="mr-2 text-gray-400" />
                          {company.originCountry}
                        </div>
                        <div className="text-sm text-gray-500">
                          {company.address?.city}, {company.address?.country}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <FaTag className="mr-2 text-gray-400" />
                          <span className="text-sm text-gray-900">{company.category}</span>
                        </div>
                        {company.scope && (
                          <div className="text-sm text-gray-500">{company.scope}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaUsers className="mr-2 text-gray-400" />
                          <span className="text-sm text-gray-900">{company.employeeCount?.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/companies/view/${company._id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="View"
                          >
                            <FaEye className="h-5 w-5" />
                          </Link>
                          <Link
                            to={`/companies/edit/${company._id}`}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            title="Edit"
                          >
                            <FaEdit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(company._id)}
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
                  fetchCompanies(page);
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

export default CompanyList;