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
  FaIdCard,
  FaCalculator,
} from "react-icons/fa";
import { BASE_URL } from "../../../../secrets";

const CertificationToCompanyForm = ({ isEdit = false }) => {
  const { companyId, certificationId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: companyId,
    certification: "",
    certificationId: "",
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
  const [manualExpiry, setManualExpiry] = useState(false);
  const [selectedCertDuration, setSelectedCertDuration] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch available certifications with duration information
        const certsResponse = await axios.get(`${BASE_URL}/api/certifications/dropdown`);
        if (certsResponse.data.success) {
          setAvailableCertifications(certsResponse.data.data);
        } else {
          throw new Error(certsResponse.data.message || "Failed to load certifications");
        }

        // Fetch company details
        const companyResponse = await axios.get(`${BASE_URL}/api/companies/${companyId}`);
        if (companyResponse.data.success) {
          setCompanyDetails(companyResponse.data.data);
        } else {
          throw new Error("Failed to load company details");
        }

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
              certificationId: certData.certificationId,
              issueDate: formatDateForInput(certData.issueDate),
              expiryDate: formatDateForInput(certData.expiryDate),
              firstSurveillanceDate: formatDateForInput(certData.firstSurveillanceDate),
              secondSurveillanceDate: formatDateForInput(certData.secondSurveillanceDate),
              status: certData.status,
              notes: certData.notes || "",
            });

            // In edit mode, we consider expiry date as manually set if it exists
            if (certData.expiryDate) {
              setManualExpiry(true);
            }

            // Find selected certification duration
            const selectedCert = availableCertifications.find(c => c._id === certData.certification._id);
            setSelectedCertDuration(selectedCert?.durationInMonths || null);
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
  }, [companyId, certificationId, isEdit, availableCertifications.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // When certification changes, get its duration
    if (name === "certification" && value) {
      const selectedCert = availableCertifications.find(c => c._id === value);
      setSelectedCertDuration(selectedCert?.durationInMonths || null);
      
      // Auto-calculate expiry if not manually set and we have duration and issue date
      if (!manualExpiry && selectedCert?.durationInMonths && formData.issueDate) {
        const calculatedExpiry = new Date(formData.issueDate);
        calculatedExpiry.setMonth(calculatedExpiry.getMonth() + selectedCert.durationInMonths);
        calculatedExpiry.setDate(calculatedExpiry.getDate() - 1); // Subtract 1 day
        setFormData(prev => ({
          ...prev,
          expiryDate: calculatedExpiry.toISOString().split("T")[0]
        }));
      }
    }
  };

  const handleIssueDateChange = (e) => {
    const issueDate = e.target.value;
    setFormData(prev => ({ ...prev, issueDate }));

    // Auto-calculate expiry if not manually set and we have duration
    if (!manualExpiry && selectedCertDuration && issueDate) {
      const calculatedExpiry = new Date(issueDate);
      calculatedExpiry.setMonth(calculatedExpiry.getMonth() + selectedCertDuration);
      calculatedExpiry.setDate(calculatedExpiry.getDate() - 1); // Subtract 1 day
      setFormData(prev => ({
        ...prev,
        expiryDate: calculatedExpiry.toISOString().split("T")[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.certification || !formData.issueDate) {
      toast.error("Please fill out all required fields");
      return;
    }

    try {
      setSubmitting(true);

      const endpoint = isEdit
        ? `${BASE_URL}/api/company-certifications/${certificationId}`
        : `${BASE_URL}/api/company-certifications`;

      const method = isEdit ? "put" : "post";

      // Prepare payload - only include fields that have values
      const payload = {
        company: formData.company,
        certification: formData.certification,
        issueDate: formData.issueDate,
        status: formData.status,
      };

      // Only include certificationId if it's provided (for edit) or has a value (for create)
      if (formData.certificationId) {
        payload.certificationId = formData.certificationId;
      }

      // Only include expiryDate if manually set
      if (manualExpiry && formData.expiryDate) {
        payload.expiryDate = formData.expiryDate;
      }

      // Include surveillance dates if they have values
      if (formData.firstSurveillanceDate) {
        payload.firstSurveillanceDate = formData.firstSurveillanceDate;
      }
      if (formData.secondSurveillanceDate) {
        payload.secondSurveillanceDate = formData.secondSurveillanceDate;
      }

      // Include notes if provided
      if (formData.notes.trim()) {
        payload.notes = formData.notes.trim();
      }

      const response = await axios[method](endpoint, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast.success(
          `Certification ${isEdit ? "updated" : "added"} successfully`
        );
        navigate(`/companies/view/${companyId}`);
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
          to={`/companies/view/${companyId}`}
          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center hover:bg-gray-200 transition-colors">
          <FaArrowLeft className="mr-1" />
          Back to Company
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Certification ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaIdCard className="inline mr-1" />
            Certification ID
            {isEdit && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            name="certificationId"
            value={formData.certificationId}
            onChange={handleChange}
            required={isEdit}
            placeholder={isEdit ? "" : "Leave blank to auto-generate"}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {!isEdit && (
            <p className="text-xs text-gray-500 mt-1">
              If left blank, a unique ID will be automatically generated (format: FCRT-XXXXXXXX)
            </p>
          )}
        </div>

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
            disabled={isEdit}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            <option value="">Select a Certification</option>
            {availableCertifications.map((cert) => (
              <option key={cert._id} value={cert._id}>
                {cert.name} {cert.durationInMonths ? `(${cert.durationInMonths} months)` : ''}
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
              onChange={handleIssueDateChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                <FaCalendarAlt className="inline mr-1" />
                Expiry Date
              </label>
              <div className="flex items-center ml-3">
                <input
                  type="checkbox"
                  id="manualExpiry"
                  checked={manualExpiry}
                  onChange={() => setManualExpiry(!manualExpiry)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="manualExpiry" className="ml-2 block text-xs text-gray-700">
                  Set manually
                </label>
              </div>
            </div>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              disabled={!manualExpiry}
              className={`w-full p-2 border rounded-md ${
                manualExpiry
                  ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  : "border-gray-200 bg-gray-100 text-gray-500"
              }`}
            />
            {!manualExpiry && (
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <FaCalculator className="mr-1" />
                {selectedCertDuration
                  ? `Expiry will be automatically calculated (${selectedCertDuration} months from issue date)`
                  : "Select a certification with duration to auto-calculate expiry"}
              </p>
            )}
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="expired">Expired</option>
            <option value="recertification">Recertification</option>
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
            placeholder="Add any additional notes or comments about this certification"
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