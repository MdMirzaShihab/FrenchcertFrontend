import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaSave, FaTimesCircle, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../../secrets";
import { useNavigate, useParams } from "react-router-dom";
import countries from "world-countries";
const PhoneInput = React.lazy(() => import("react-phone-input-2"));
import "react-phone-input-2/lib/style.css";

const CompanyForm = () => {
  const { id } = useParams(); // Get company ID from URL if editing
  const [formData, setFormData] = useState({
    name: "",
    originCountry: "",
    category: "",
    employeeCount: "",
    scope: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });
  const [fields, setFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!id); // Only true when editing
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Load company data when editing
  useEffect(() => {
    if (!id) return;

    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/companies/${id}`);
        if (response.data.success) {
          const company = response.data.data;
          setFormData({
            name: company.name || "",
            originCountry: company.originCountry || "",
            category: company.category || "",
            employeeCount: company.employeeCount?.toString() || "",
            scope: company.scope || "",
            email: company.email || "",
            phone: company.phone || "",
            address: {
              street: company.address?.street || "",
              city: company.address?.city || "",
              postalCode: company.address?.postalCode || "",
              country: company.address?.country || "",
            },
          });

          if (company.fields?.length > 0) {
            setSelectedFields(
              company.fields.map((field) =>
                typeof field === "object" ? field._id : field
              )
            );
          }
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load company data"
        );
        navigate("/admin/companies");
      } finally {
        setIsFetching(false);
      }
    };

    fetchCompanyData();
  }, [id, navigate]);

  // Load available fields
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/fields`);
        if (response.data.success) {
          setFields(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to load fields");
      }
    };
    fetchFields();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.name.trim()) newErrors.name = "Company name is required";
    if (!formData.originCountry.trim())
      newErrors.originCountry = "Origin country is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.employeeCount)
      newErrors.employeeCount = "Employee count is required";
    if (isNaN(formData.employeeCount) || parseInt(formData.employeeCount) < 1) {
      newErrors.employeeCount = "Must be a positive number";
    }
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.street.trim())
      newErrors["address.street"] = "Street is required";
    if (!formData.address.city.trim())
      newErrors["address.city"] = "City is required";
    if (!formData.address.postalCode.trim())
      newErrors["address.postalCode"] = "Postal code is required";
    if (!formData.address.country.trim())
      newErrors["address.country"] = "Country is required";
    if (selectedFields.length === 0)
      newErrors.fields = "At least one field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFieldsChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedFields(selected);
    if (errors.fields) {
      setErrors((prev) => ({ ...prev, fields: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);
    try {
      const submitData = {
        ...formData,
        employeeCount: parseInt(formData.employeeCount, 10),
        fields: selectedFields,
      };

      if (id) {
        // Update existing company
        await axios.put(`${BASE_URL}/api/companies/${id}`, submitData);
        toast.success("Company updated successfully");
      } else {
        // Create new company
        await axios.post(`${BASE_URL}/api/companies`, submitData);
        toast.success("Company created successfully");
      }
      navigate("/admin/companies");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);

      // Handle specific field errors from backend
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {id ? "Edit Company" : "Add New Company"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Origin Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Origin Country *
            </label>
            <input
              type="text"
              name="originCountry"
              value={formData.originCountry}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.originCountry ? "border-red-500" : "border-gray-300"
              }`}
              list="countries-list"
            />
            {errors.originCountry && (
              <p className="mt-1 text-sm text-red-600">
                {errors.originCountry}
              </p>
            )}
            <datalist id="countries-list">
              {countries.map((country) => (
                <option key={country.cca2} value={country.name.common} />
              ))}
            </datalist>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Employee Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee Count <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="employeeCount"
              value={formData.employeeCount}
              onChange={handleChange}
              min="1"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.employeeCount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.employeeCount && (
              <p className="mt-1 text-sm text-red-600">
                {errors.employeeCount}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scope<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="scope"
              value={formData.scope}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Fields */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fields <span className="text-red-500">*</span>
            </label>
            {errors.fields && (
              <p className="mt-1 text-sm text-red-600">{errors.fields}</p>
            )}

            <div className="space-y-2">
              {fields.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {fields.map((field) => (
                    <div key={field._id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`field-${field._id}`}
                        checked={selectedFields.includes(field._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFields([...selectedFields, field._id]);
                          } else {
                            setSelectedFields(
                              selectedFields.filter((id) => id !== field._id)
                            );
                          }
                          if (errors.fields) {
                            setErrors((prev) => ({
                              ...prev,
                              fields: undefined,
                            }));
                          }
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`field-${field._id}`}
                        className="ml-2 text-sm text-gray-700">
                        {field.name}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No fields available</p>
              )}
            </div>

            {selectedFields.length > 0 && (
              <p className="mt-2 text-sm text-gray-700">
                Selected: {selectedFields.length} field(s)
              </p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <PhoneInput
                country={"bd"}
                value={formData.phone}
                onChange={(phone) =>
                  setFormData((prevData) => ({ ...prevData, phone }))
                }
                inputProps={{
                  name: "phone",
                  required: true,
                }}
                containerClass="w-full"
                inputClass={`w-full px-3 py-2 border rounded-md ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Street */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street *
              </label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors["address.street"]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors["address.street"] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors["address.street"]}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors["address.city"] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors["address.city"] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors["address.city"]}
                </p>
              )}
            </div>

            {/* Postal Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code *
              </label>
              <input
                type="text"
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors["address.postalCode"]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors["address.postalCode"] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors["address.postalCode"]}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors["address.country"]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                list="countries-list"
              />
              {errors["address.country"] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors["address.country"]}
                </p>
              )}
              <datalist id="countries-list">
                {countries.map((country) => (
                  <option key={country.cca2} value={country.name.common} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={() => navigate("/admin/companies")}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md flex items-center hover:bg-gray-50 disabled:opacity-50">
            <FaTimesCircle className="mr-2" /> Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-white bg-blue-600 rounded-md flex items-center hover:bg-blue-700 disabled:opacity-50">
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Saving...
              </>
            ) : (
              <>
                <FaSave className="mr-2" /> Save Company
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
