import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FaBuilding, FaSearch, FaFilter, FaEdit, FaEye, FaTrash, 
  FaGlobe, FaTag, FaUsers, FaSortAmountDown, FaSortAmountUp, 
  FaSync, FaExclamationTriangle
} from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL } from "../../../secrets";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    countries: [],
    categories: [],
    fields: []
  });
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Filters and search
  const [filters, setFilters] = useState({
    search: '',
    country: '',
    category: '',
    field: '',
    minEmployees: '',
    maxEmployees: ''
  });

  // Sort options
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        const [countriesRes, categoriesRes, fieldsRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/companies/countries/list`),
          axios.get(`${BASE_URL}/api/companies/categories/list`),
          axios.get(`${BASE_URL}/api/fields`)
        ]);
        
        setFilterOptions({
          countries: countriesRes.data.success ? countriesRes.data.data : [],
          categories: categoriesRes.data.success ? categoriesRes.data.data : [],
          fields: fieldsRes.data.success ? fieldsRes.data.data : []
        });
      } catch (error) {
        toast.error('Failed to load filter options');
        console.error('Filter options error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          search: filters.search,
          country: filters.country,
          category: filters.category,
          field: filters.field,
          minEmployees: filters.minEmployees,
          maxEmployees: filters.maxEmployees,
          page: currentPage,
          limit: 10,
          sort: sortField,
          order: sortDirection
        };

        // Remove empty params
        Object.keys(params).forEach(key => {
          if (!params[key]) delete params[key];
        });

        const response = await axios.get(`${BASE_URL}/api/companies`, { params });
        
        if (response.data.success) {
          setCompanies(response.data.data);
          setTotalCompanies(response.data.total);
          setTotalPages(response.data.pages);
          setCurrentPage(response.data.currentPage);
        } else {
          setError(response.data.message || 'Failed to fetch companies');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to fetch companies';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Fetch companies error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchCompanies();
    }, 300); // Debounce to prevent rapid API calls

    return () => clearTimeout(debounceTimer);
  }, [filters, currentPage, sortField, sortDirection]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      country: '',
      category: '',
      field: '',
      minEmployees: '',
      maxEmployees: ''
    });
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDeleteCompany = async (id) => {
    if (!window.confirm('Are you sure you want to delete this company? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await axios.delete(`${BASE_URL}/api/companies/${id}`);
      
      if (response.data.success) {
        toast.success('Company deleted successfully');
        // Re-fetch companies but keep current filters
        setCurrentPage(prev => Math.min(prev, Math.max(1, totalPages - 1)));
      } else {
        toast.error(response.data.message || 'Failed to delete company');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Failed to delete company';
      toast.error(errorMessage);
      console.error('Delete company error:', error);
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' 
      ? <FaSortAmountUp className="ml-1 inline" /> 
      : <FaSortAmountDown className="ml-1 inline" />;
  };

  const renderEmptyState = () => {
    if (error) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-8 text-center">
          <FaExclamationTriangle className="mx-auto text-yellow-500 text-4xl mb-4" />
          <h3 className="text-lg font-medium text-yellow-800 mb-2">Error Loading Companies</h3>
          <p className="text-yellow-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md p-8 text-center">
        <FaBuilding className="mx-auto text-gray-400 text-4xl mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">No Companies Found</h3>
        <p className="text-gray-500 mb-4">
          {Object.values(filters).some(val => val !== '') 
            ? 'Try adjusting your filters to see more results' 
            : 'Start by adding a new company'}
        </p>
        {Object.values(filters).some(val => val !== '') && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-7xl mx-auto">
      {/* Header and buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center mb-4 md:mb-0">
          <FaBuilding className="mr-2" /> Companies
          {loading && <span className="ml-2 text-sm text-gray-500">Loading...</span>}
        </h1>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            disabled={loading}
            className={`px-4 py-2 rounded-md flex items-center transition-colors ${
              loading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 
              'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            <FaFilter className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          <button
            onClick={() => navigate('/admin/companies/add')}
            className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center hover:bg-green-700 transition-colors"
            disabled={loading}
          >
            <FaBuilding className="mr-2" /> Add New Company
          </button>
        </div>
      </div>
      
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search companies by name or scope..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-md disabled:bg-gray-50"
            disabled={loading}
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
        </div>
      </div>
      
      {/* Filters panel */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700">Filter Companies</h3>
            <button
              onClick={resetFilters}
              className="text-blue-600 flex items-center hover:text-blue-800 disabled:text-gray-400"
              disabled={loading}
            >
              <FaSync className="mr-1" /> Reset Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Origin Country</label>
              <select
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                disabled={loading}
              >
                <option value="">All Countries</option>
                {filterOptions.countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                disabled={loading}
              >
                <option value="">All Categories</option>
                {filterOptions.categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field</label>
              <select
                name="field"
                value={filters.field}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                disabled={loading}
              >
                <option value="">All Fields</option>
                {filterOptions.fields.map(field => (
                  <option key={field._id} value={field._id}>{field.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Employees</label>
              <input
                type="number"
                name="minEmployees"
                value={filters.minEmployees}
                onChange={handleFilterChange}
                min="1"
                className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Employees</label>
              <input
                type="number"
                name="maxEmployees"
                value={filters.maxEmployees}
                onChange={handleFilterChange}
                min="1"
                className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                disabled={loading}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Companies list */}
      {loading && companies.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : companies.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => !loading && handleSort('name')}
                  >
                    <span className="flex items-center">
                      Company Name {renderSortIcon('name')}
                    </span>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => !loading && handleSort('originCountry')}
                  >
                    <span className="flex items-center">
                      Country {renderSortIcon('originCountry')}
                    </span>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => !loading && handleSort('category')}
                  >
                    <span className="flex items-center">
                      Category {renderSortIcon('category')}
                    </span>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => !loading && handleSort('employeeCount')}
                  >
                    <span className="flex items-center">
                      Employees {renderSortIcon('employeeCount')}
                    </span>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {companies.map(company => (
                  <tr key={company._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FaGlobe className="mr-1 text-gray-500" />
                        {company.originCountry}
                      </div>
                      <div className="text-sm text-gray-500">
                        {company.address?.city}, {company.address?.country}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaTag className="mr-1 text-gray-500" />
                        <span className="text-sm text-gray-900">{company.category}</span>
                      </div>
                      {company.scope && (
                        <div className="text-sm text-gray-500">{company.scope}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaUsers className="mr-1 text-gray-500" />
                        <span className="text-sm text-gray-900">{company.employeeCount?.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          to={`/admin/companies/view/${company._id}`}
                          className="text-blue-600 hover:text-blue-900 disabled:text-gray-400"
                          title="View Details"
                        >
                          <FaEye />
                        </Link>
                        <Link 
                          to={`/admin/companies/edit/${company._id}`}
                          className="text-green-600 hover:text-green-900 disabled:text-gray-400"
                          title="Edit Company"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDeleteCompany(company._id)}
                          className="text-red-600 hover:text-red-900 disabled:text-gray-400"
                          title="Delete Company"
                          disabled={loading}
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
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{companies.length}</span> of{' '}
              <span className="font-medium">{totalCompanies}</span> results
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => !loading && setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || loading}
                className={`px-3 py-1 rounded ${
                  currentPage === 1 || loading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                Previous
              </button>
              
              {/* Page numbers */}
              <div className="flex space-x-1">
                {[...Array(totalPages).keys()].map(page => (
                  <button
                    key={page + 1}
                    onClick={() => !loading && setCurrentPage(page + 1)}
                    disabled={loading}
                    className={`px-3 py-1 rounded ${
                      currentPage === page + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } ${loading ? 'cursor-not-allowed' : ''}`}
                  >
                    {page + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => !loading && setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || loading}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages || loading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyList;