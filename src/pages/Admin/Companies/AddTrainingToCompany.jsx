import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";

const AddTrainingToCompany = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [availableTrainings, setAvailableTrainings] = useState([]);
  const [formData, setFormData] = useState({
    trainingId: "",
    trainingDate: "",
    employees: "",
    trainingNumber: ""
  });

  useEffect(() => {
    // API call to fetch available trainings
    setAvailableTrainings([
      { id: "train1", name: "Cybersecurity Awareness" },
      { id: "train2", name: "Quality Management" },
      { id: "train3", name: "Environmental Management" }
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to add training to company
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
      
      <h1 className="text-2xl font-bold mb-6">Add Training to Company</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Training</label>
            <select
              name="trainingId"
              value={formData.trainingId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Training</option>
              {availableTrainings.map(train => (
                <option key={train.id} value={train.id}>{train.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Training Number</label>
            <input
              type="text"
              name="trainingNumber"
              value={formData.trainingNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Training Date</label>
            <input
              type="date"
              name="trainingDate"
              value={formData.trainingDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Number of Employees</label>
            <input
              type="number"
              name="employees"
              value={formData.employees}
              onChange={handleChange}
              min="1"
              className="w-full p-2 border rounded"
              required
            />
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
            <FaSave className="mr-2" /> Save Training
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTrainingToCompany;