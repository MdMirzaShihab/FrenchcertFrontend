import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaSpinner, FaEye, FaFileAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "../../../components/Pagination";
import { BASE_URL } from "../../../secrets";

const PageList = () => {
  const [state, setState] = useState({
    pages: [],
    loading: true,
    searchTerm: '',
    currentPage: 1,
    totalPages: 1,
    error: null
  });

  const { 
    pages, 
    loading, 
    searchTerm, 
    currentPage, 
    totalPages, 
    error 
  } = state;

  const fetchPages = useCallback(async (page = 1) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const params = {
        page,
        limit: 10,
        ...(searchTerm && { search: searchTerm })
      };
  
      const response = await axios.get(`${BASE_URL}/api/pages`, { params });
      
      // Make sure we have the expected structure
      const responseData = response.data.data;
      
      setState(prev => ({
        ...prev,
        pages: responseData.docs || [], // Use empty array as fallback
        totalPages: responseData.pages || 1,
        currentPage: responseData.page || 1,
        loading: false
      }));
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch pages';
      setState(prev => ({ ...prev, loading: false, error: errorMsg }));
      toast.error(errorMsg);
    }
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPages(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchPages]);

  const handleResetFilters = () => {
    setState(prev => ({
      ...prev,
      searchTerm: '',
      currentPage: 1
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        await axios.delete(`${BASE_URL}/api/pages/${id}`);
        toast.success('Page deleted successfully');
        fetchPages(currentPage);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete page');
      }
    }
  };

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
      <FaFileAlt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900">No pages found</h3>
      <p className="mt-1 text-sm text-gray-500">
        Try adjusting your search or create a new page.
      </p>
      <div className="mt-6">
        <Link
          to="/pages/add"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaPlus className="mr-2" /> Create New Page
        </Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-bold text-gray-900">Page Management</h1>
          <Link
            to="/pages/add"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPlus className="mr-2" /> Add Page
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
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
              />
            </div>

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
        ) : !pages || pages.length === 0 ? ( // Added null check
          <EmptyState />
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title & Slug
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Navbar
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pages.map((page) => (
                    <tr key={page._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{page.title}</div>
                            <div className="text-sm text-gray-500">
                              /{page.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          page.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {page.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          page.showInNavbar 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {page.showInNavbar ? 'Visible' : 'Hidden'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/pages/view/${page._id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="View"
                          >
                            <FaEye className="h-5 w-5" />
                          </Link>
                          <Link
                            to={`/pages/edit/${page._id}`}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            title="Edit"
                          >
                            <FaEdit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(page._id)}
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
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setState(prev => ({ ...prev, currentPage: page }));
                  fetchPages(page);
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

export default PageList;