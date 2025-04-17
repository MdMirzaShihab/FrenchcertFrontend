import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../secrets";

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    method: "",
    field: ""
  });
  const [availableTypes, setAvailableTypes] = useState([]);
  const [availableMethods, setAvailableMethods] = useState([]);
  const [availableFields, setAvailableFields] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.type) params.append('type', filters.type);
        if (filters.method) params.append('method', filters.method);
        if (filters.field) params.append('field', filters.field);
        
        const [trainingsRes, typesRes, methodsRes, fieldsRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/trainings?${params}`),
          axios.get(`${BASE_URL}/api/trainings/types/list`),
          axios.get(`${BASE_URL}/api/trainings/methods/list`),
          axios.get(`${BASE_URL}/api/fields`)
        ]);
        
        if (trainingsRes.data.success) setTrainings(trainingsRes.data.data);
        if (typesRes.data.success) setAvailableTypes(typesRes.data.data);
        if (methodsRes.data.success) setAvailableMethods(methodsRes.data.data);
        if (fieldsRes.data.success) setAvailableFields(fieldsRes.data.data?.fields);
        
      } catch (error) {
        toast.error("Failed to fetch data: " + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [filters]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this training?")) return;
    
    setDeletingId(id);
    try {
      const response = await axios.delete(`${BASE_URL}/api/trainings/${id}`);
      if (response.data.success) {
        setTrainings(trainings.filter(t => t._id !== id));
        toast.success("Training deleted successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete training");
    } finally {
      setDeletingId(null);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
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
        <h1 className="text-2xl font-bold">Training Management</h1>
        <Link
          to="/admin/trainings/add"
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700"
        >
          <FaPlus className="mr-2" /> Add Training
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative md:col-span-2">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search trainings..."
            className="pl-10 pr-4 py-2 border rounded w-full"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
        
        <select
          className="p-2 border rounded"
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="">All Types</option>
          {availableTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        
        <select
          className="p-2 border rounded"
          value={filters.method}
          onChange={(e) => handleFilterChange('method', e.target.value)}
        >
          <option value="">All Methods</option>
          {availableMethods.map(method => (
            <option key={method} value={method}>
              {method.charAt(0).toUpperCase() + method.slice(1)}
            </option>
          ))}
        </select>
        
        <select
          className="p-2 border rounded md:col-start-4"
          value={filters.field}
          onChange={(e) => handleFilterChange('field', e.target.value)}
        >
          <option value="">All Fields</option>
          {availableFields.map(field => (
            <option key={field._id} value={field._id}>{field.name}</option>
          ))}
        </select>
      </div>

      {trainings.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          No trainings found. Try adjusting your filters or add a new training.
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
                    Methods
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
                {trainings.map((training) => (
                  <tr key={training._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{training.name}</div>
                      <div className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {training.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {training.trainingType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {training.trainingMethod?.map(method => (
                          <span key={method} className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            {method}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {training.durationInHours} hours
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/trainings/edit/${training._id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(training._id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={deletingId === training._id}
                      >
                        {deletingId === training._id ? (
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

export default TrainingList;