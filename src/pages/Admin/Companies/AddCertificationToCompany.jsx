import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";

const AddCertificationToCompany = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [availableCertifications, setAvailableCertifications] = useState([]);
  const [formData, setFormData] = useState({
    certificationId: "",
    issueDate: "",
    firstSurveillanceDate: "",
    secondSurveillanceDate: "",
    expiryDate: "",
    status: "Active",
    certificationNumber: ""
  });

  useEffect(() => {
    // API call to fetch available certifications
    setAvailableCertifications([
      { id: "cert1", name: "ISO 9001:2015" },
      { id: "cert2", name: "ISO 14001:2015" },
      { id: "cert3", name: "ISO 27001:2022" }
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to add certification to company
    console.log("Form submitted:", formData);
    navigate(`/admin/companies/view/${companyId}`);
  };

  return (
    <div>
      <button
        onClick={() => navigate(`/admin/companies/view/${companyId}`)}
        className="flex items-center text-blue-600 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Company
      </button>
      
      <h1 className="text-2xl font-bold mb-6">Add Certification to Company</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Certification</label>
            <select
              name="certificationId"
              value={formData.certificationId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Certification</option>
              {availableCertifications.map(cert => (
                <option key={cert.id} value={cert.id}>{cert.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Certification Number</label>
            <input
              type="text"
              name="certificationNumber"
              value={formData.certificationNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Issue Date</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">First Surveillance Date</label>
            <input
              type="date"
              name="firstSurveillanceDate"
              value={formData.firstSurveillanceDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Second Surveillance Date</label>
            <input
              type="date"
              name="secondSurveillanceDate"
              value={formData.secondSurveillanceDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Expired">Expired</option>
              <option value="Withdrawn">Withdrawn</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/admin/companies/view/${companyId}`)}
            className="px-4 py-2 border rounded text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded flex items-center"
          >
            <FaSave className="mr-2" /> Save Certification
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCertificationToCompany;