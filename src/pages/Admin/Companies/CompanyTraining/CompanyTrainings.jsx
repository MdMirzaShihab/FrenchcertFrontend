import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaChalkboardTeacher,
  FaEdit,
  FaEye,
  FaTrash,
  FaSpinner,
  FaExclamationTriangle,
  FaFilter,
  FaTimes,
  FaCalendarAlt,
  FaUsers,
  FaLaptop,
  FaUserFriends,
  FaBlenderPhone,
} from "react-icons/fa";
import { BASE_URL } from "../../../../secrets";

const CompanyTrainings = ({ companyId }) => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    trainingStart: "",
    trainingEnd: "",
    method: ""
  });
  const [showFilters, setShowFilters] = useState(false);

  const fetchTrainings = async (filterParams = {}) => {
    try {
      setLoading(true);
      setError(null);
  
      // Build query string for filters
      const params = new URLSearchParams();
  
      // Add filters if they exist
      if (filterParams.status) {
        params.status = filterParams.status;
      }
      if (filterParams.trainingStart) {
        params.startDate = filterParams.trainingStart;
      }
      if (filterParams.trainingEnd) {
        params.endDate = filterParams.trainingEnd;
      }
      if (filterParams.method) {
        params.method = filterParams.method;
      }
  
      // Use axios params option which handles encoding properly
      const trainingsRes = await axios.get(
        `${BASE_URL}/api/company-trainings?${params.toString()}`
      );
  
      if (trainingsRes.data.success) {
        setTrainings(trainingsRes.data.data);
      } else {
        throw new Error(
          trainingsRes.data.message || "Failed to load trainings"
        );
      }
    } catch (trainingError) {
      console.error("Error fetching trainings:", trainingError);
      setError(
        `Failed to load trainings from ${BASE_URL}/api/company-trainings: ${err.response?.data?.message || err.message}`
      );
      setTrainings([]);
      toast.error("Failed to load trainings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, [companyId]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    fetchTrainings(filters);
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      trainingStart: "",
      trainingEnd: "",
      method: ""
    });
    fetchTrainings({});
  };

  const handleDeleteTraining = async (trainingId) => {
    if (!window.confirm("Are you sure you want to delete this training record?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `${BASE_URL}/api/company-trainings/${trainingId}`
      );

      if (response.data.success) {
        toast.success("Training record deleted successfully");
        fetchTrainings(filters);
      } else {
        throw new Error(
          response.data.message || "Failed to delete training record"
        );
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete training record"
      );
    }
  };

  // Format date for better display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleDateString();
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Requested":
        return "bg-blue-100 text-blue-800";
      case "Time to Retrain":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get method icon
  const getMethodIcon = (method) => {
    switch (method) {
      case 'online':
        return <FaLaptop className="mr-1" />;
      case 'in-person':
        return <FaUserFriends className="mr-1" />;
      case 'hybrid':
        return <FaBlenderPhone className="mr-1" />;
      default:
        return <FaChalkboardTeacher className="mr-1" />;
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
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6 text-center">
        <FaExclamationTriangle className="mx-auto text-yellow-500 text-4xl mb-4" />
        <h2 className="text-xl font-bold text-yellow-800 mb-2">
          Error Loading Trainings
        </h2>
        <p className="text-yellow-600 mb-4">{error}</p>
        <button
          onClick={() => fetchTrainings()}
          className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <FaChalkboardTeacher className="mr-2 text-blue-600" />
          Training Records
        </h2>

        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-md flex items-center hover:bg-blue-200 transition-colors">
            <FaFilter className="mr-1" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          <Link
            to={`/admin/companies/${companyId}/add-training`}
            className="px-3 py-2 bg-green-600 text-white text-sm rounded-md flex items-center hover:bg-green-700 transition-colors">
            <FaChalkboardTeacher className="mr-1" />
            Add Training
          </Link>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-gray-50 p-4 mb-4 rounded-lg border border-gray-200">
          <form
            onSubmit={applyFilters}
            className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Statuses</option>
                <option value="Requested">Requested</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Time to Retrain">Time to Retrain</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="inline mr-1" />
                Training From
              </label>
              <input
                type="date"
                name="trainingStart"
                value={filters.trainingStart}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="inline mr-1" />
                Training To
              </label>
              <input
                type="date"
                name="trainingEnd"
                value={filters.trainingEnd}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Method
              </label>
              <select
                name="method"
                value={filters.method}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Methods</option>
                <option value="online">Online</option>
                <option value="in-person">In-Person</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="flex items-end space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Apply Filters
              </button>

              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center">
                <FaTimes className="mr-1" />
                Reset
              </button>
            </div>
          </form>
        </div>
      )}

      {trainings.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md p-8 text-center">
          <FaChalkboardTeacher className="mx-auto text-gray-400 text-4xl mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No Training Records
          </h3>
          <p className="text-gray-500 mb-4">
            {filters.status || filters.trainingStart || filters.trainingEnd || filters.method
              ? "No training records match the current filters."
              : "This company does not have any training records yet."}
          </p>
          {filters.status || filters.trainingStart || filters.trainingEnd || filters.method ? (
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-2">
              Clear Filters
            </button>
          ) : null}
          <Link
            to={`/admin/companies/${companyId}/add-training`}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Add First Training
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Training Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Training ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Training Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trainings.map((training) => (
                <tr key={training._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaChalkboardTeacher className="text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {training.training?.name || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {training.trainingId || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(training.trainingDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      {getMethodIcon(training.trainingMethod)}
                      <span className="capitalize">{training.trainingMethod}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaUsers className="mr-1" />
                      {training.employeeCount || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        training.status
                      )}`}>
                      {training.status || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/admin/companies/training/${training._id}`}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Training Details">
                        <FaEye />
                      </Link>
                      <Link
                        to={`/admin/companies/${companyId}/edit-training/${training._id}`}
                        className="text-green-600 hover:text-green-900"
                        title="Edit Training">
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteTraining(training._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Training">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompanyTrainings;