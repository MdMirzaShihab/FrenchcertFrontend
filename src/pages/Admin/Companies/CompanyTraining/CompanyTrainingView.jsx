import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaBuilding,
  FaUsers,
  FaArrowLeft,
  FaPrint,
  FaEdit,
  FaSpinner,
  FaExclamationTriangle,
  FaLaptop,
  FaUserFriends,
  FaBlenderPhone
} from 'react-icons/fa';
import { BASE_URL } from "../../../../secrets";

const CompanyTrainingView = () => {
  const { id } = useParams();
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/company-trainings/${id}`, {
          params: {
            populate: 'company,training'
          }
        });
        
        if (response.data.success) {
          setTraining(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to load training record');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load training record');
      } finally {
        setLoading(false);
      }
    };

    fetchTraining();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'online':
        return <FaLaptop className="inline mr-1" />;
      case 'in-person':
        return <FaUserFriends className="inline mr-1" />;
      case 'hybrid':
        return <FaBlenderPhone className="inline mr-1" />;
      default:
        return null;
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
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-md p-8 text-center">
          <FaExclamationTriangle className="mx-auto text-red-500 text-4xl mb-4" />
          <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Training Record</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            to={`/companies/view/${training?.company?._id || ''}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Company
          </Link>
        </div>
      </div>
    );
  }

  if (!training) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-5xl mx-auto print:p-0 print:shadow-none">
      {/* Header with actions */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b print:hidden">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            <FaChalkboardTeacher className="inline mr-3 text-blue-600" />
            Training Record Details
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            {training.company?.name || 'N/A'}
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Link
            to={`/companies/${training.company?._id}/edit-training/${training._id}`}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors flex items-center"
          >
            <FaEdit className="mr-2" />
            Edit Training
          </Link>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center"
          >
            <FaPrint className="mr-2" />
            Print
          </button>
          <Link
            to={`/companies/view/${training.company?._id}`}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </Link>
        </div>
      </div>
      
      {/* Training Content */}
      <div className="space-y-8 print:space-y-6">
        {/* Training ID Banner */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-800">
            Training ID: {training.trainingId || 'N/A'}
          </h2>
          <div className="mt-2 flex items-center">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              training.status === 'Completed' ? 'bg-green-100 text-green-800' :
              training.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
              training.status === 'Requested' ? 'bg-blue-100 text-blue-800' :
              training.status === 'Time to Retrain' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {training.status || 'N/A'}
            </span>
          </div>
        </div>

        {/* Main Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Company Information Card */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaBuilding className="mr-3 text-blue-600" />
              Company Information
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Company Name</h3>
                <p className="text-lg text-gray-800">{training.company?.name || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Employees Trained</h3>
                <p className="text-lg text-gray-800">
                  <FaUsers className="inline mr-1" />
                  {training.employeeCount || 'N/A'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Training Information Card */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaChalkboardTeacher className="mr-3 text-blue-600" />
              Training Details
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Training Program</h3>
                <p className="text-lg text-gray-800">{training.training?.name || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Training Method</h3>
                <p className="text-lg text-gray-800">
                  {getMethodIcon(training.trainingMethod)}
                  <span className="capitalize">{training.trainingMethod || 'N/A'}</span>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Duration</h3>
                <p className="text-lg text-gray-800">
                  {training.training?.durationInHours ? `${training.training.durationInHours} hours` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dates Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-600" />
              Training Date
            </h3>
            <p className="text-xl font-medium text-gray-900">
              {formatDate(training.trainingDate)}
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-600" />
              Next Retraining Date
            </h3>
            <p className="text-xl font-medium text-gray-900">
              {formatDate(training.nextRetrainingDate)}
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Trainer
            </h3>
            <p className="text-xl font-medium text-gray-900">
              {training.trainer || 'Not specified'}
            </p>
          </div>
        </div>

        {/* Certificate Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Certificate Issued
            </h3>
            <p className="text-xl font-medium text-gray-900">
              {training.certificateIssued ? 'Yes' : 'No'}
            </p>
          </div>
          
          {training.certificateIssued && (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-600" />
                Certificate Issue Date
              </h3>
              <p className="text-xl font-medium text-gray-900">
                {formatDate(training.certificateIssueDate)}
              </p>
            </div>
          )}
        </div>
        
        {/* Notes Section */}
        {training.notes && (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Additional Notes
            </h3>
            <div className="prose max-w-none text-gray-800 whitespace-pre-line">
              {training.notes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyTrainingView;