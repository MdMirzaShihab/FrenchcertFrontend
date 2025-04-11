import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios"; 
import { BASE_URL } from "../../../secrets";


const FieldList = () => {
  const [fields, setFields] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFields = async () => {
      try {
        // Make the GET request using axios
        const response = await axios.get(`${BASE_URL}/api/fields`);
        if (response.data.success) {
          setFields(response.data.data); // Set the fields in state
        }
      } catch (error) {
        console.error("Error fetching fields:", error.message);
      }
    };
    fetchFields();
  }, []);

  const filteredFields = fields.filter(
    (field) =>
      field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      // Make the DELETE request using axios
      const response = await axios.delete(`${BASE_URL}/api/fields/${id}`);
      if (response.data.success) {
        // Remove the deleted field from the state
        setFields(fields.filter((field) => field._id !== id));
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting field:", error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Field Management</h1>
        <Link to="/admin/fields/add" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          <FaPlus className="mr-2" /> Add Field
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search fields..."
            className="pl-10 pr-4 py-2 border rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFields.map((field) => (
              <tr key={field._id}>
                <td className="px-6 py-4 whitespace-nowrap">{field.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{field.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/admin/fields/edit/${field._id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                    <FaEdit />
                  </Link>
                  <button onClick={() => handleDelete(field._id)} className="text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FieldList;
