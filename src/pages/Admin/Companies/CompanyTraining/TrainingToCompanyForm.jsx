import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaClipboardCheck,
  FaInfoCircle,
  FaSpinner,
  FaSave,
  FaArrowLeft,
  FaIdCard,
  FaUsers,
  FaLaptop,
  FaUserFriends,
  FaBlenderPhone,
} from "react-icons/fa";
import { BASE_URL } from "../../../../secrets";

const TrainingToCompanyForm = ({ isEdit = false }) => {
  const { companyId, trainingId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: companyId,
    training: "",
    trainingId: "",
    trainingDate: "",
    nextRetrainingDate: "",
    employeeCount: 1,
    completed: "Completed",
    notes: "",
  });

  const [availableTrainings, setAvailableTrainings] = useState([]);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [manualRetraining, setManualRetraining] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch available trainings
        const trainingsResponse = await axios.get(`${BASE_URL}/api/trainings/dropdown`);
        if (trainingsResponse.data.success) {
          setAvailableTrainings(trainingsResponse.data.data);
        } else {
          throw new Error(trainingsResponse.data.message || "Failed to load trainings");
        }

        // Fetch company details
        const companyResponse = await axios.get(`${BASE_URL}/api/companies/${companyId}`);
        if (companyResponse.data.success) {
          setCompanyDetails(companyResponse.data.data);
        } else {
          throw new Error("Failed to load company details");
        }

        if (isEdit && trainingId) {
          const trainingResponse = await axios.get(
            `${BASE_URL}/api/company-trainings/${trainingId}`
          );
          if (trainingResponse.data.success) {
            const trainingData = trainingResponse.data.data;

            // Format dates for form inputs
            const formatDateForInput = (dateString) => {
              if (!dateString) return "";
              const date = new Date(dateString);
              return date.toISOString().split("T")[0];
            };

            setFormData({
              company: trainingData.company._id,
              training: trainingData.training._id,
              trainingId: trainingData.trainingId,
              trainingDate: formatDateForInput(trainingData.trainingDate),
              nextRetrainingDate: formatDateForInput(trainingData.nextRetrainingDate),
              employeeCount: trainingData.employeeCount,
              completed: trainingData.completed,
              notes: trainingData.notes || "",
            });

            // In edit mode, we consider retraining date as manually set if it exists
            if (trainingData.nextRetrainingDate) {
              setManualRetraining(true);
            }
          } else {
            throw new Error("Failed to load training details");
          }
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load data"
        );
        toast.error("Failed to load necessary data");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [companyId, trainingId, isEdit]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const handleTrainingDateChange = (e) => {
    const trainingDate = e.target.value;
    setFormData(prev => ({ ...prev, trainingDate }));

    // Auto-calculate next retraining if not manually set
    if (!manualRetraining && trainingDate) {
      const calculatedRetraining = new Date(trainingDate);
      calculatedRetraining.setFullYear(calculatedRetraining.getFullYear() + 1); // Default to 1 year later
      setFormData(prev => ({
        ...prev,
        nextRetrainingDate: calculatedRetraining.toISOString().split("T")[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.training || !formData.trainingDate) {
      toast.error("Please fill out all required fields");
      return;
    }

    try {
      setSubmitting(true);

      const endpoint = isEdit
        ? `${BASE_URL}/api/company-trainings/${trainingId}`
        : `${BASE_URL}/api/company-trainings`;

      const method = isEdit ? "put" : "post";

      // Prepare payload
      const payload = {
        ...formData,
        // For new trainings, if trainingId is empty, let the backend generate it
        trainingId: isEdit ? formData.trainingId : (formData.trainingId || undefined),
        // Clear nextRetrainingDate if not manually set (backend will calculate)
        nextRetrainingDate: manualRetraining ? formData.nextRetrainingDate : undefined,
        // Ensure employeeCount is a number
        employeeCount: parseInt(formData.employeeCount, 10)
      };

      const response = await axios[method](endpoint, payload);

      if (response.data.success) {
        toast.success(
          `Training ${isEdit ? "updated" : "added"} successfully`
        );
        navigate(`/companies/view/${companyId}`);
      } else {
        throw new Error(
          response.data.message ||
            `Failed to ${isEdit ? "update" : "add"} training`
        );
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          `Failed to ${isEdit ? "update" : "add"} training`
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-md p-8 text-center">
          <FaInfoCircle className="mx-auto text-red-500 text-4xl mb-4" />
          <h2 className="text-xl font-bold text-red-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            to={`/companies/view/${companyId}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Return to Company
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEdit ? "Edit Training Record" : "Add New Training"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEdit
              ? "Update training details for"
              : "Add a new training record to"}{" "}
            {companyDetails?.name}
          </p>
        </div>

        <Link
          to={`/companies/view/${companyId}`}
          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center hover:bg-gray-200 transition-colors">
          <FaArrowLeft className="mr-1" />
          Back to Company
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Training ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaIdCard className="inline mr-1" />
            Training ID
            {isEdit && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            name="trainingId"
            value={formData.trainingId}
            onChange={handleChange}
            required={isEdit}
            placeholder={isEdit ? "" : "Leave blank to auto-generate"}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {!isEdit && (
            <p className="text-xs text-gray-500 mt-1">
              If left blank, a unique ID will be automatically generated (format: FTRN-XXXXXX)
            </p>
          )}
        </div>

        {/* Training Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaChalkboardTeacher className="inline mr-1" />
            Training Program <span className="text-red-500">*</span>
          </label>
          <select
            name="training"
            value={formData.training}
            onChange={handleChange}
            required
            disabled={isEdit}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            <option value="">Select a Training Program</option>
            {availableTrainings.map((training) => (
              <option key={training._id} value={training._id}>
                {training.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dates - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaCalendarAlt className="inline mr-1" />
              Training Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="trainingDate"
              value={formData.trainingDate}
              onChange={handleTrainingDateChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                <FaCalendarAlt className="inline mr-1" />
                Next Retraining Date
              </label>
              <div className="flex items-center ml-3">
                <input
                  type="checkbox"
                  id="manualRetraining"
                  checked={manualRetraining}
                  onChange={() => setManualRetraining(!manualRetraining)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="manualRetraining" className="ml-2 block text-xs text-gray-700">
                  Set manually
                </label>
              </div>
            </div>
            <input
              type="date"
              name="nextRetrainingDate"
              value={formData.nextRetrainingDate}
              onChange={handleChange}
              disabled={!manualRetraining}
              className={`w-full p-2 border rounded-md ${
                manualRetraining
                  ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  : "border-gray-200 bg-gray-100 text-gray-500"
              }`}
            />
            {!manualRetraining && (
              <p className="text-xs text-gray-500 mt-1">
                Next retraining will be automatically calculated (1 year from training date)
              </p>
            )}
          </div>
        </div>

        {/* Employee Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaUsers className="inline mr-1" />
            Number of Employees Trained <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="employeeCount"
            value={formData.employeeCount}
            onChange={handleChange}
            min="1"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaClipboardCheck className="inline mr-1" />
            Status <span className="text-red-500">*</span>
          </label>
          <select
            name="completed"
            value={formData.completed}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Requested">Requested</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Time to Retrain">Time to Retrain</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaInfoCircle className="inline mr-1" />
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add any additional notes or comments about this training"
          ></textarea>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Link
            to={`/companies/view/${companyId}`}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            {submitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                {isEdit ? "Updating..." : "Saving..."}
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                {isEdit ? "Update Training" : "Save Training"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrainingToCompanyForm;