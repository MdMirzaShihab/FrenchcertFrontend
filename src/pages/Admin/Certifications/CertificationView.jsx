import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from "../../../secrets";

const CertificationView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [certification, setCertification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertification = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/certifications/${id}`);
        setCertification(response.data.data);
      } catch (error) {
        toast.error('Failed to fetch certification');
        navigate('/admin/certifications');
      } finally {
        setLoading(false);
      }
    };

    fetchCertification();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      try {
        await axios.delete(`${BASE_URL}/api/certifications/${id}`);
        toast.success('Certification deleted successfully');
        navigate('/admin/certifications');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete certification');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!certification) {
    return <div className="container mx-auto px-4 py-8">Certification not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link
          to="/admin/certifications"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Back to Certifications
        </Link>
        <div className="flex gap-4">
          <Link
            to={`/admin/certifications/edit/${id}`}
            className="flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
          >
            <FaEdit className="mr-2" /> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            <FaTrash className="mr-2" /> Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">{certification.name}</h2>
          <p className="text-gray-600">{certification.certificationType}</p>
        </div>

        <div className="px-6 py-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Short Description</h3>
            <p className="text-gray-700">{certification.shortDescription}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <div 
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: certification.description }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Call to Action</h3>
              <p className="text-gray-700">{certification.callToAction}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Duration</h3>
              <p className="text-gray-700">{certification.durationInMonths} months</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Fields</h3>
            <div className="flex flex-wrap gap-2">
              {certification.fields.map(field => (
                <span 
                  key={field._id} 
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {field.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationView;