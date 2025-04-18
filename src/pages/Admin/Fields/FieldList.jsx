import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../secrets";
import Pagination from "../../../components/Pagination";

const FieldList = () => {
  const [state, setState] = useState({
    fields: [],
    loading: true,
    searchTerm: '',
    currentPage: 1,
    totalPages: 1,
    error: null
  });

  const { fields, loading, searchTerm, currentPage, totalPages, error } = state;

  const fetchFields = useCallback(async (page = 1, search = "") => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await axios.get(`${BASE_URL}/api/fields`, {
        params: {
          page,
          limit: 10,
          search,
        },
      });

      if (response.data.success) {
        setState(prev => ({
          ...prev,
          fields: response.data.data.fields || response.data.data.docs || [],
          currentPage: response.data.data.page || 1,
          totalPages: response.data.data.pages || 1,
          loading: false
        }));
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to fetch fields";
      setState(prev => ({ ...prev, loading: false, error: errorMsg }));
      toast.error(errorMsg);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFields(1, searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, fetchFields]);

  const handlePageChange = (newPage) => {
    setState(prev => ({ ...prev, currentPage: newPage }));
    fetchFields(newPage, searchTerm);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this field?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/fields/${id}`);
      toast.success("Field deleted successfully");
      fetchFields(currentPage, searchTerm);
    } catch (error) {
      let errorMsg = error.response?.data?.message || "Failed to delete field";

      if (error.response?.data?.references) {
        errorMsg =
          "Cannot delete: Field is referenced in " +
          `${
            error.response.data.references.certifications > 0
              ? "certifications, "
              : ""
          }` +
          `${
            error.response.data.references.trainings > 0 ? "trainings, " : ""
          }` +
          `${error.response.data.references.companies > 0 ? "companies" : ""}`;
        errorMsg = errorMsg.replace(/, $/, "");
      }

      toast.error(errorMsg);
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
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">No fields found</h3>
      <p className="mt-1 text-sm text-gray-500">
        {searchTerm ? 'Try adjusting your search' : 'Get started by creating a new field'}
      </p>
      <div className="mt-6">
        <Link
          to="/admin/fields/add"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaPlus className="mr-2" /> Add Field
        </Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-bold text-gray-900">Field Management</h1>
          <Link
            to="/admin/fields/add"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPlus className="mr-2" /> Add Field
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
              placeholder="Search fields by name..."
              value={searchTerm}
              onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <ErrorMessage />}

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : fields.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fields.map((field) => (
                    <tr key={field._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{field.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {field.description || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/admin/fields/view/${field._id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="View"
                          >
                            <FaEye className="h-5 w-5" />
                          </Link>
                          <Link
                            to={`/admin/fields/edit/${field._id}`}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            title="Edit"
                          >
                            <FaEdit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(field._id)}
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
                onPageChange={handlePageChange}
                className="px-4 py-3 bg-gray-50 border-t border-gray-200"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldList;