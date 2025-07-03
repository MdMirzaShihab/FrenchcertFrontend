import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaClock,
  FaChevronLeft,
  FaTag,
  FaLaptop,
  FaUserFriends,
  FaBlenderPhone,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../secrets";

const TrainingView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/trainings/${id}`
        );
        if (response.data.success) {
          setTraining(response.data.data);
        } else {
          throw new Error("Failed to load training details");
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "An error occurred while loading the training"
        );
        toast.error(
          error.response?.data?.message ||
            "Failed to load training details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTraining();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this training?")) {
      try {
        await axios.delete(`${BASE_URL}/api/trainings/${id}`);
        toast.success("Training deleted successfully");
        navigate("/trainings");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete training"
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-gray-600">Loading training details...</p>
      </div>
    );
  }

  if (error || !training) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Training Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error ||
              "The training you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            to="/trainings"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <FaChevronLeft className="mr-2" /> Back to Training List
          </Link>
        </div>
      </div>
    );
  }

  // Method icons mapping
  const methodIcons = {
    'online': <FaLaptop className="mr-1" />,
    'in-person': <FaUserFriends className="mr-1" />,
    'hybrid': <FaBlenderPhone className="mr-1" />
  };

  // Format duration display
  const formatDuration = (hours) => {
    if (hours < 8) return `${hours} hours`;
    const days = Math.round(hours / 8 * 10) / 10;
    return `${hours} hours (approx. ${days} days)`;
  };

  // Custom CSS for rich text formatting
  const richTextStyles = `
    .training-content {
      line-height: 1.6;
      color: #374151;
    }
    .training-content h1 {
      font-size: 2em;
      margin: 1em 0 0.5em;
      font-weight: 600;
      color: #111827;
    }
    .training-content h2 {
      font-size: 1.5em;
      margin: 1em 0 0.5em;
      font-weight: 600;
      color: #111827;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 0.3em;
    }
    .training-content h3 {
      font-size: 1.25em;
      margin: 1em 0 0.5em;
      font-weight: 600;
      color: #111827;
    }
    .training-content p {
      margin-bottom: 1em;
    }
    .training-content ul, 
    .training-content ol {
      margin-bottom: 1em;
      padding-left: 1.5em;
    }
    .training-content ul {
      list-style-type: disc;
    }
    .training-content ol {
      list-style-type: decimal;
    }
    .training-content li {
      margin-bottom: 0.5em;
    }
    .training-content a {
      color: #3b82f6;
      text-decoration: underline;
    }
    .training-content a:hover {
      color: #2563eb;
    }
    .training-content strong {
      font-weight: 600;
    }
    .training-content em {
      font-style: italic;
    }
    .training-content u {
      text-decoration: underline;
    }
    .training-content .text-align-left {
      text-align: left;
    }
    .training-content .text-align-center {
      text-align: center;
    }
    .training-content .text-align-right {
      text-align: right;
    }
    .training-content .text-align-justify {
      text-align: justify;
    }
    .training-content img {
      max-width: 100%;
      height: auto;
      margin: 1em 0;
      border-radius: 0.5rem;
    }
  `;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link
          to="/trainings"
          className="flex items-center text-blue-600 hover:text-blue-800">
          <FaArrowLeft className="mr-2" /> Back to Training List
        </Link>
        <div className="flex gap-4">
          <Link
            to={`/trainings/edit/${id}`}
            className="flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg">
            <FaEdit className="mr-2" /> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
            <FaTrash className="mr-2" /> Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">
            Name : <span className="text-gray-700 font-medium text-lg">{training.name}</span>
          </h3>
        </div>
        
        <div className="px-6 py-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">
              Short Description :
            </h3>
            <p className="text-gray-700">{training.shortDescription}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">
              Description :
            </h3>
            <div
              className="training-content"
              dangerouslySetInnerHTML={{ __html: training.description }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-blue-800 mb-2">
                Call to Action :
              </h3>
              <p className="text-gray-700">{training.callToAction}</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-blue-800 mb-2">
                Duration
              </h3>
              <p className="text-gray-700">
                {formatDuration(training.durationInHours)}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-blue-800 mb-2">
                Training Methods
              </h3>
              <div className="flex flex-wrap gap-2">
                {training.trainingMethod.map((method) => (
                  <span
                    key={method}
                    className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm capitalize">
                    {methodIcons[method]}
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Fields</h3>
            <div className="flex flex-wrap gap-2">
              {training.fields.map((field) => (
                <span
                  key={field._id}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {field.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
        <style dangerouslySetInnerHTML={{ __html: richTextStyles }} />
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">
            The Way visitors will see...
          </h2>
        </div>

        <div className="px-6 py-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-3">
                    <FaTag className="mr-1" />
                    {training.trainingType}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {training.name}
                  </h1>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                    <FaClock className="mr-2" />
                    <span>{formatDuration(training.durationInHours)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {training.trainingMethod.map((method) => (
                      <span
                        key={method}
                        className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm capitalize">
                        {methodIcons[method]}
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="training-content"
                dangerouslySetInnerHTML={{ __html: training.description }}
              />
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-md overflow-hidden mb-12">
            <div className="p-8 md:p-10 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {training.callToAction}
              </h2>
              <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                Ready to enroll in our {training.trainingType} training? Our
                experts will guide you through the entire program.
              </p>
              <button className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingView;