import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { 
  FaGraduationCap, FaEdit, FaEye, FaSpinner, FaExclamationTriangle
} from 'react-icons/fa';
import { BASE_URL } from "../../../secrets";

const CompanyTrainings = ({ companyId }) => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const trainingsRes = await axios.get(`${BASE_URL}/api/company-trainings/company/${companyId}`);
        setTrainings(trainingsRes.data.success ? trainingsRes.data.data : []);
      } catch (trainingError) {
        console.error('Error fetching trainings:', trainingError);
        setError(trainingError.response?.data?.message || trainingError.message || 'Failed to load trainings');
        setTrainings([]);
        toast.error('Failed to load trainings');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, [companyId]);

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
        <h2 className="text-xl font-bold text-yellow-800 mb-2">Error Loading Trainings</h2>
        <p className="text-yellow-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <FaGraduationCap className="mr-2 text-blue-600" />
          Trainings
        </h2>
        
        <Link
          to={`/admin/companies/${companyId}/add-training`}
          className="px-3 py-2 bg-green-600 text-white text-sm rounded-md flex items-center hover:bg-green-700 transition-colors"
        >
          <FaGraduationCap className="mr-1" />
          Add Training
        </Link>
      </div>
      
      {trainings.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md p-8 text-center">
          <FaGraduationCap className="mx-auto text-gray-400 text-4xl mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Trainings</h3>
          <p className="text-gray-500 mb-4">
            This company does not have any trainings recorded yet.
          </p>
          <Link
            to={`/admin/companies/${companyId}/add-training`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add First Training
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Training Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trainings.map(training => (
                <tr key={training._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaGraduationCap className="text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{training.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {training.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(training.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(training.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link 
                        to={`/admin/trainings/${training._id}`}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <FaEye />
                      </Link>
                      <Link 
                        to={`/admin/trainings/edit/${training._id}`}
                        className="text-green-600 hover:text-green-900"
                        title="Edit Training"
                      >
                        <FaEdit />
                      </Link>
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