import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../secrets";

const FieldForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      const fetchField = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/api/fields/${id}`);
          if (response.data.success) {
            setFormData({
              name: response.data.data.name,
              description: response.data.data.description || "",
            });
          }
        } catch (error) {
          setError(error.response?.data?.message || "Failed to fetch field");
          toast.error(error.response?.data?.message || "Failed to fetch field");
        } finally {
          setLoading(false);
        }
      };
      fetchField();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = isEdit 
        ? `${BASE_URL}/api/fields/${id}` 
        : `${BASE_URL}/api/fields`;
      const method = isEdit ? "put" : "post";

      const response = await axios[method](url, formData);

      if (response.data.success) {
        toast.success(
          isEdit 
            ? "Field updated successfully" 
            : "Field created successfully"
        );
        navigate("/admin/fields");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        (error.code === 11000 
          ? "Field with this name already exists" 
          : "An error occurred");
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return <div className="p-6">Loading field data...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Field" : "Add New Field"}
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 gap-6">
          <div>
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

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded"
              disabled={loading}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/admin/fields")}
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
              "Update Field"
            ) : (
              "Save Field"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FieldForm;