import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../secrets";

const CertificationList = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [fieldFilter, setFieldFilter] = useState("");
  const [availableTypes, setAvailableTypes] = useState([]);
  const [availableFields, setAvailableFields] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch certifications with filters
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (typeFilter) params.append('type', typeFilter);
        if (fieldFilter) params.append('field', fieldFilter);
        
        const [certsRes, typesRes, fieldsRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/certifications?${params}`),
          axios.get(`${BASE_URL}/api/certifications/types/list`),
          axios.get(`${BASE_URL}/api/fields`)
        ]);
        
        if (certsRes.data.success) setCertifications(certsRes.data.data);
        if (typesRes.data.success) setAvailableTypes(typesRes.data.data);
        if (fieldsRes.data.success) setAvailableFields(fieldsRes.data.data);
        
      } catch (error) {
        toast.error("Failed to fetch data: " + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [searchTerm, typeFilter, fieldFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certification?")) return;
    
    setDeletingId(id);
    try {
      const response = await axios.delete(`${BASE_URL}/api/certifications/${id}`);
      if (response.data.success) {
        setCertifications(certifications.filter(c => c._id !== id));
        toast.success("Certification deleted successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete certification");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center">
        <FaSpinner className="animate-spin text-2xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Certification Management</h1>
        <Link
          to="/admin/certifications/add"
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700"
        >
          <FaPlus className="mr-2" /> Add Certification
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search certifications..."
            className="pl-10 pr-4 py-2 border rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className="p-2 border rounded"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          {availableTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        
        <select
          className="p-2 border rounded"
          value={fieldFilter}
          onChange={(e) => setFieldFilter(e.target.value)}
        >
          <option value="">All Fields</option>
          {availableFields.map(field => (
            <option key={field._id} value={field._id}>{field.name}</option>
          ))}
        </select>
      </div>

      {certifications.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          No certifications found. Try adjusting your filters or add a new certification.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fields
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {certifications.map((cert) => (
                  <tr key={cert._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{cert.name}</div>
                      <div className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {cert.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {cert.certificationType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {cert.fields?.map(field => (
                          <span key={field._id} className="px-2 py-1 text-xs rounded-full bg-gray-100">
                            {field.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {cert.durationInMonths} months
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/certifications/edit/${cert._id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(cert._id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={deletingId === cert._id}
                      >
                        {deletingId === cert._id ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaTrash />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationList;