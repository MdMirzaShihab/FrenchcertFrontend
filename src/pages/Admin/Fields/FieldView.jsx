import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrash, FaList } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../secrets";

const FieldView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [references, setReferences] = useState({
    certifications: [],
    trainings: [],
    companies: []
  });
  const [loadingReferences, setLoadingReferences] = useState(true);

  useEffect(() => {
    const fetchField = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${BASE_URL}/api/fields/${id}`);
        
        if (response.data.success) {
          setField(response.data.data);
          fetchReferences(response.data.data._id);
        } else {
          setError("Field not found");
        }
      } catch (err) {
        console.error("Error fetching field:", err);
        setError(err.response?.data?.message || "Failed to load field data");
        toast.error(err.response?.data?.message || "Failed to load field data");
      } finally {
        setLoading(false);
      }
    };

    const fetchReferences = async (fieldId) => {
      try {
        setLoadingReferences(true);
        const [certRes, trainRes, compRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/certifications?field=${fieldId}&limit=3`),
          axios.get(`${BASE_URL}/api/trainings?field=${fieldId}&limit=3`),
          axios.get(`${BASE_URL}/api/companies?field=${fieldId}&limit=3`)
        ]);

        setReferences({
          certifications: certRes.data.success ? certRes.data.data.certifications || [] : [],
          trainings: trainRes.data.success ? trainRes.data.data.trainings || [] : [],
          companies: compRes.data.success ? compRes.data.data.companies || [] : []
        });
      } catch (err) {
        console.error("Error fetching references:", err);
        toast.error("Failed to load reference data");
      } finally {
        setLoadingReferences(false);
      }
    };

    fetchField();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this field?")) return;
    
    try {
      const response = await axios.delete(`${BASE_URL}/api/fields/${id}`);
      if (response.data.success) {
        toast.success("Field deleted successfully");
        navigate("/admin/fields");
      }
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

  const ReferenceSection = ({ title, items, type, loading }) => {
    if (loading) return <div className="text-gray-500">Loading {title.toLowerCase()}...</div>;
    if (!items || items.length === 0) return <div className="text-gray-500">No {title.toLowerCase()} found</div>;

    return (
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">{title}</h3>
        <ul className="space-y-1">
          {items.slice(0, 3).map(item => (
            <li key={item._id} className="flex items-center">
              <Link 
                to={`/admin/${type}/view/${item._id}`} 
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                {item.name}
                <FiExternalLink className="ml-1" size={12} />
              </Link>
            </li>
          ))}
        </ul>
        {items.length > 3 && (
          <Link 
            to={`/admin/${type}?field=${id}`}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            View all ({items.length})
          </Link>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => navigate(-1)} 
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Error Loading Field</h2>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
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
          <div className="mt-6">
            <button
              onClick={() => navigate("/admin/fields")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Fields List
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!field) {
    return null; // Shouldn't reach here if error is properly set
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        {/* Header with back button */}
        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)} 
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Field Details</h2>
          </div>
          <div className="flex space-x-2">
            <Link
              to={`/admin/fields/edit/${field._id}`}
              className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaEdit className="mr-1" /> Edit
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FaTrash className="mr-1" /> Delete
            </button>
            <Link
              to="/admin/fields"
              className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaList className="mr-1" /> All Fields
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div className="px-6 py-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{field.name}</h1>
            {field.description && (
              <p className="mt-2 text-gray-600 whitespace-pre-line">{field.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <ReferenceSection 
                title="Certifications" 
                items={references.certifications} 
                type="certifications" 
                loading={loadingReferences} 
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ReferenceSection 
                title="Trainings" 
                items={references.trainings} 
                type="trainings" 
                loading={loadingReferences} 
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ReferenceSection 
                title="Companies" 
                items={references.companies} 
                type="companies" 
                loading={loadingReferences} 
              />
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Created:</span> {new Date(field.createdAt).toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Last Updated:</span> {new Date(field.updatedAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldView;