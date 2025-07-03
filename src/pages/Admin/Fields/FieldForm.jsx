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
    if (isEdit && id) {
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
          const errorMsg = error.response?.data?.message || "Failed to fetch field";
          setError(errorMsg);
          toast.error(errorMsg);
          navigate("/fields", { replace: true });
        } finally {
          setLoading(false);
        }
      };
      fetchField();
    }
  }, [isEdit, id, navigate]);

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
        navigate("/fields");
      }
    } catch (error) {
      let errorMessage = "An error occurred";
      
      if (error.response) {
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data?.references) {
          errorMessage = "Cannot modify: Field is referenced elsewhere";
        }
      } else if (error.code === 11000) {
        errorMessage = "Field with this name already exists";
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-lg">Loading field data...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
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
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              minLength="2"
              maxLength="100"
              disabled={loading}
            />
            <p className="mt-1 text-sm text-gray-500">
              Between 2-100 characters
            </p>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength="500"
              disabled={loading}
            />
            <p className="mt-1 text-sm text-gray-500">
              Max 500 characters
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/fields")}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
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