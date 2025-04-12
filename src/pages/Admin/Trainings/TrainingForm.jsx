import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../secrets";

const TrainingForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableMethods, setAvailableMethods] = useState([]);
  const [availableFields, setAvailableFields] = useState([]);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    trainingType: "", // Changed to free-form input
    trainingMethod: [],
    fields: [],
    durationInHours: 8
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Removed the types API call since we're not using dropdown anymore
        const [methodsRes, fieldsRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/trainings/methods/list`),
          axios.get(`${BASE_URL}/api/fields`)
        ]);
        
        if (methodsRes.data.success) setAvailableMethods(methodsRes.data.data);
        if (fieldsRes.data.success) setAvailableFields(fieldsRes.data.data);
        
        if (isEdit) {
          const trainingRes = await axios.get(`${BASE_URL}/api/trainings/${id}`);
          if (trainingRes.data.success) {
            const training = trainingRes.data.data;
            setFormData({
              name: training.name,
              description: training.description,
              trainingType: training.trainingType,
              trainingMethod: training.trainingMethod,
              fields: training.fields.map(f => f._id),
              durationInHours: training.durationInHours || 8
            });
          }
        }
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch data");
        toast.error(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMethodToggle = (method) => {
    setFormData(prev => ({
      ...prev,
      trainingMethod: prev.trainingMethod.includes(method)
        ? prev.trainingMethod.filter(m => m !== method)
        : [...prev.trainingMethod, method]
    }));
  };

  const handleFieldToggle = (fieldId) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.includes(fieldId)
        ? prev.fields.filter(id => id !== fieldId)
        : [...prev.fields, fieldId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = isEdit 
        ? `${BASE_URL}/api/trainings/${id}` 
        : `${BASE_URL}/api/trainings`;
      const method = isEdit ? "put" : "post";

      const response = await axios[method](url, formData);

      if (response.data.success) {
        toast.success(
          isEdit 
            ? "Training updated successfully" 
            : "Training created successfully"
        );
        navigate("/admin/trainings");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return <div className="p-6">Loading training data...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Training" : "Add New Training"}
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              disabled={loading}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded"
              required
              disabled={loading}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">
              Training Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="trainingType"
              value={formData.trainingType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              disabled={loading}
              placeholder="e.g., Safety Training, Technical Skills, etc."
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Duration (hours) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="durationInHours"
              min="1"
              value={formData.durationInHours}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              disabled={loading}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">
              Training Methods <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {availableMethods.map(method => (
                <label key={method} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.trainingMethod.includes(method)}
                    onChange={() => handleMethodToggle(method)}
                    className="mr-2"
                    disabled={loading}
                  />
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Fields</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {availableFields.map(field => (
                <label key={field._id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.fields.includes(field._id)}
                    onChange={() => handleFieldToggle(field._id)}
                    className="mr-2"
                    disabled={loading}
                  />
                  {field.name}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/admin/trainings")}
            className="px-4 py-2 border rounded text-gray-700"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? (
              "Processing..."
            ) : isEdit ? (
              "Update Training"
            ) : (
              "Save Training"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrainingForm;