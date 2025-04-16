import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../secrets";
import Pagination from "../../../components/Pagination";

const FieldList = () => {
    const [fields, setFields] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
      page: 1,
      limit: 10,
      total: 0,
      pages: 1
    });
  
    const fetchFields = async (page = 1, search = "") => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/fields`, {
          params: {
            page,
            limit: pagination.limit,
            search
          }
        });
        
        if (response.data.success) {
          setFields(response.data.data);
          setPagination({
            page: response.data.page,
            limit: pagination.limit,
            total: response.data.total,
            pages: response.data.pages
          });
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch fields");
        console.error("Error fetching fields:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
        // Search with debounce to prevent too many requests
        const timer = setTimeout(() => {
          fetchFields(1, searchTerm);
        }, 300); // 300ms debounce delay
    
        return () => clearTimeout(timer);
      }, [searchTerm]);
    
  
      const handlePageChange = (newPage) => {
        fetchFields(newPage, searchTerm);
      };
  
    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this field?")) return;
      
      try {
        const response = await axios.delete(`${BASE_URL}/api/fields/${id}`);
        if (response.data.success) {
          toast.success("Field deleted successfully");
          // Refresh the current page after deletion
          fetchFields(pagination.page, searchTerm);
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || 
          (error.response?.data?.references 
            ? "Cannot delete: Field is referenced elsewhere" 
            : "Failed to delete field");
        toast.error(errorMsg);
        console.error("Error deleting field:", error);
      }
    };
  
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Field Management</h1>
          <Link 
            to="/admin/fields/add" 
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition"
          >
            <FaPlus className="mr-2" /> Add Field
          </Link>
        </div>
  
        <div className="mb-6">
          <div className="relative max-w-md">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search fields..."
              className="pl-10 pr-4 py-2 border rounded w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
  
        <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
          {loading ? (
            <div className="p-4 text-center">Loading fields...</div>
          ) : fields.length === 0 ? (
            <div className="p-4 text-center">No fields found</div>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fields.map((field) => (
                    <tr key={field._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{field.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-500">{field.description || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/admin/fields/edit/${field._id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4 inline-block"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(field._id)}
                          className="text-red-600 hover:text-red-900 inline-block"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={handlePageChange}
                className="border-t border-gray-200 px-4 py-3"
              />
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default FieldList;