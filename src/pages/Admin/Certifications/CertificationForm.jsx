import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../secrets";

const CertificationForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableTypes, setAvailableTypes] = useState([]);
  const [availableFields, setAvailableFields] = useState([]);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    certificationType: "",
    fields: [],
    durationInMonths: 12
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [typesRes, fieldsRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/certifications/types/list`),
          axios.get(`${BASE_URL}/api/fields`)
        ]);
        
        if (typesRes.data.success) setAvailableTypes(typesRes.data.data);
        if (fieldsRes.data.success) setAvailableFields(fieldsRes.data.data);
        
        if (isEdit) {
          const certRes = await axios.get(`${BASE_URL}/api/certifications/${id}`);
          if (certRes.data.success) {
            const cert = certRes.data.data;
            setFormData({
              name: cert.name,
              description: cert.description,
              certificationType: cert.certificationType,
              fields: cert.fields.map(f => f._id),
              durationInMonths: cert.durationInMonths || 12
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
        ? `${BASE_URL}/api/certifications/${id}` 
        : `${BASE_URL}/api/certifications`;
      const method = isEdit ? "put" : "post";

      const response = await axios[method](url, formData);

      if (response.data.success) {
        toast.success(
          isEdit 
            ? "Certification updated successfully" 
            : "Certification created successfully"
        );
        navigate("/admin/certifications");
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
    return <div className="p-6">Loading certification data...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Certification" : "Add New Certification"}
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

          <div>
            <label className="block text-gray-700 mb-2">
              Certification Type <span className="text-red-500">*</span>
            </label>
            <select
              name="certificationType"
              value={formData.certificationType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              disabled={loading}
            >
              <option value="">Select Type</option>
              {availableTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Duration (months) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="durationInMonths"
              min="1"
              value={formData.durationInMonths}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              disabled={loading}
            />
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
            onClick={() => navigate("/admin/certifications")}
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
              "Update Certification"
            ) : (
              "Save Certification"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CertificationForm;