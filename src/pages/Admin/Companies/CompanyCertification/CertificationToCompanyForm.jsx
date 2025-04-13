import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaCertificate,
  FaCalendarAlt,
  FaClipboardCheck,
  FaInfoCircle,
  FaSpinner,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";
import { BASE_URL } from "../../../../secrets";

const CertificationToCompanyForm = ({ isEdit = false }) => {
  const { companyId, certificationId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: companyId,
    certification: "",
    issueDate: "",
    expiryDate: "",
    firstSurveillanceDate: "",
    secondSurveillanceDate: "",
    status: "active",
    notes: "",
  });

  const [availableCertifications, setAvailableCertifications] = useState([]);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch available certifications
        const certsResponse = await axios.get(`${BASE_URL}/api/certifications`);
        if (certsResponse.data.success) {
          setAvailableCertifications(certsResponse.data.data);
        } else {
          throw new Error("Failed to load certifications");
        }

        // Fetch company details
        const companyResponse = await axios.get(
          `${BASE_URL}/api/companies/${companyId}`
        );
        if (companyResponse.data.success) {
          setCompanyDetails(companyResponse.data.data);
        } else {
          throw new Error("Failed to load company details");
        }

        // Only fetch certification data if in edit mode
        if (isEdit && certificationId) {
          const certResponse = await axios.get(
            `${BASE_URL}/api/company-certifications/${certificationId}`
          );
          if (certResponse.data.success) {
            const certData = certResponse.data.data;

            // Format dates for form inputs
            const formatDateForInput = (dateString) => {
              if (!dateString) return "";
              const date = new Date(dateString);
              return date.toISOString().split("T")[0];
            };

            setFormData({
              company: certData.company._id,
              certification: certData.certification._id,
              issueDate: formatDateForInput(certData.issueDate),
              expiryDate: formatDateForInput(certData.expiryDate),
              firstSurveillanceDate: formatDateForInput(
                certData.firstSurveillanceDate
              ),
              secondSurveillanceDate: formatDateForInput(
                certData.secondSurveillanceDate
              ),
              status: certData.status,
              notes: certData.notes || "",
            });
          } else {
            throw new Error("Failed to load certification details");
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
  }, [companyId, certificationId, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.certification ||
      !formData.issueDate ||
      !formData.expiryDate
    ) {
      toast.error("Please fill out all required fields");
      return;
    }

    try {
      setSubmitting(true);

      const endpoint = isEdit
        ? `${BASE_URL}/api/company-certifications/${certificationId}`
        : `${BASE_URL}/api/company-certifications`;

      const method = isEdit ? "put" : "post";

      const response = await axios[method](endpoint, formData);

      if (response.data.success) {
        toast.success(
          `Certification ${isEdit ? "updated" : "added"} successfully`
        );
        navigate(`/admin/companies/view/${companyId}`);
      } else {
        throw new Error(
          response.data.message ||
            `Failed to ${isEdit ? "update" : "add"} certification`
        );
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          `Failed to ${isEdit ? "update" : "add"} certification`
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
            to={`/admin/companies/view/${companyId}`}
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
            {isEdit ? "Edit Certification" : "Add New Certification"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEdit
              ? "Update certification details for"
              : "Add a new certification to"}{" "}
            {companyDetails?.name}
          </p>
        </div>

        <Link
          to={`/admin/companies/view/${companyId}`}
          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center hover:bg-gray-200 transition-colors">
          <FaArrowLeft className="mr-1" />
          Back to Company
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Certification Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaCertificate className="inline mr-1" />
            Certification Type <span className="text-red-500">*</span>
          </label>
          <select
            name="certification"
            value={formData.certification}
            onChange={handleChange}
            required
            disabled={isEdit} // Disable in edit mode to prevent changing certification
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100">
            <option value="">Select a Certification</option>
            {availableCertifications.map((cert) => (
              <option key={cert._id} value={cert._id}>
                {cert.name} - {cert.issuedBy}
              </option>
            ))}
          </select>
        </div>

        {/* Dates - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaCalendarAlt className="inline mr-1" />
              Issue Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaCalendarAlt className="inline mr-1" />
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Surveillance Dates - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaCalendarAlt className="inline mr-1" />
              First Surveillance Date
            </label>
            <input
              type="date"
              name="firstSurveillanceDate"
              value={formData.firstSurveillanceDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional surveillance audit date
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaCalendarAlt className="inline mr-1" />
              Second Surveillance Date
            </label>
            <input
              type="date"
              name="secondSurveillanceDate"
              value={formData.secondSurveillanceDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional surveillance audit date
            </p>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaClipboardCheck className="inline mr-1" />
            Status <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="expired">Expired</option>
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
            placeholder="Add any additional notes or comments about this certification"></textarea>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Link
            to={`/admin/companies/view/${companyId}`}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
            {submitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                {isEdit ? "Updating..." : "Saving..."}
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                {isEdit ? "Update Certification" : "Save Certification"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CertificationToCompanyForm;
