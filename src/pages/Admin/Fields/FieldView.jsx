import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrash, FaList, FaSpinner, FaCertificate, FaGraduationCap, FaBuilding } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../secrets";

const FieldView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    field: null,
    loading: true,
    error: null
  });

  const { field, loading, error } = state;

  useEffect(() => {
    const fetchField = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await axios.get(`${BASE_URL}/api/fields/${id}`);
        
        if (response.data.success) {
          setState(prev => ({ ...prev, field: response.data.data }));
        } else {
          setState(prev => ({ ...prev, error: "Field not found" }));
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Failed to load field data";
        setState(prev => ({ ...prev, error: errorMsg }));
        toast.error(errorMsg);
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    fetchField();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this field?")) return;
    
    try {
      await axios.delete(`${BASE_URL}/api/fields/${id}`);
      toast.success("Field deleted successfully");
      navigate("/fields");
    } catch (err) {
      let errorMsg = err.response?.data?.message || "Failed to delete field";
      
      if (err.response?.data?.references) {
        errorMsg = "Cannot delete: Field is referenced in " + 
          `${err.response.data.references.certifications > 0 ? 'certifications, ' : ''}` +
          `${err.response.data.references.trainings > 0 ? 'trainings, ' : ''}` +
          `${err.response.data.references.companies > 0 ? 'companies' : ''}`;
        errorMsg = errorMsg.replace(/, $/, '');
      }
      
      toast.error(errorMsg);
    }
  };

  const ReferenceSection = ({ title, items, type, icon: Icon }) => {
    if (!items || items.length === 0) {
      return (
        <div className="bg-gray-50 p-4 rounded-lg h-full">
          <div className="flex items-center text-gray-500 mb-2">
            <Icon className="mr-2" />
            <h3 className="font-medium">{title}</h3>
          </div>
          <p className="text-gray-400 text-sm">No {title.toLowerCase()} found</p>
        </div>
      );
    }
  
    return (
      <div className="bg-gray-50 p-4 rounded-lg h-full">
        <div className="flex items-center text-gray-700 mb-3">
          <Icon className="mr-2" />
          <h3 className="font-medium">{title}</h3>
        </div>
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item._id}>
              <Link 
                to={`/${type}/view/${item._id}`} 
                className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
              >
                {item.name}
                <FiExternalLink className="ml-1" size={12} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b flex items-center">
            <button 
              onClick={() => navigate(-1)} 
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Error Loading Field</h2>
          </div>
          <div className="p-6">
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
            <div className="flex space-x-3">
              <button
                onClick={() => navigate("/fields")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Fields List
              </button>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!field) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <button 
              onClick={() => navigate(-1)} 
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Field Details</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to={`/fields/edit/${field._id}`}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaEdit className="mr-2" /> Edit
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
            <Link
              to="/fields"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaList className="mr-2" /> All Fields
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div className="px-6 py-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{field.name}</h1>
            {field.description && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">{field.description}</p>
              </div>
            )}
          </div>

          {/* Reference sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReferenceSection 
              title="Certifications" 
              items={field.certifications} 
              type="certifications"
              icon={FaCertificate}
            />
            <ReferenceSection 
              title="Trainings" 
              items={field.trainings} 
              type="trainings"
              icon={FaGraduationCap}
            />
            <ReferenceSection 
              title="Companies" 
              items={field.companies} 
              type="companies"
              icon={FaBuilding}
            />
          </div>

          {/* Metadata */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-700">Created:</span> {new Date(field.createdAt).toLocaleString()}
              </div>
              <div>
                <span className="font-medium text-gray-700">Last Updated:</span> {new Date(field.updatedAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldView;