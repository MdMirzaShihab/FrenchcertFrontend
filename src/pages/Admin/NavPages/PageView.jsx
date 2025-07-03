import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../secrets";

const PageView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/pages/id/${id}`);
        if (response.data.success) {
          setPage(response.data.data);
        } else {
          throw new Error("Failed to load page details");
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "An error occurred while loading the page"
        );
        toast.error(
          error.response?.data?.message || "Failed to load page details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      try {
        await axios.delete(`${BASE_URL}/api/pages/${id}`);
        toast.success("Page deleted successfully");
        navigate("/pages");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete page");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-gray-600">Loading page details...</p>
      </div>
    );
  }

  if (error || !page) {
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
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The page you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            to="/pages"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <FaArrowLeft className="mr-2" /> Back to Pages List
          </Link>
        </div>
      </div>
    );
  }

  // Custom CSS for rich text formatting
  const richTextStyles = `
    .page-content {
      line-height: 1.6;
      color: #374151;
    }
    .page-content h1 {
      font-size: 2em;
      margin: 1em 0 0.5em;
      font-weight: 600;
      color: #111827;
    }
    .page-content h2 {
      font-size: 1.5em;
      margin: 1em 0 0.5em;
      font-weight: 600;
      color: #111827;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 0.3em;
    }
    .page-content h3 {
      font-size: 1.25em;
      margin: 1em 0 0.5em;
      font-weight: 600;
      color: #111827;
    }
    .page-content p {
      margin-bottom: 1em;
    }
    .page-content ul, 
    .page-content ol {
      margin-bottom: 1em;
      padding-left: 1.5em;
    }
    .page-content ul {
      list-style-type: disc;
    }
    .page-content ol {
      list-style-type: decimal;
    }
    .page-content li {
      margin-bottom: 0.5em;
    }
    .page-content a {
      color: #3b82f6;
      text-decoration: underline;
    }
    .page-content a:hover {
      color: #2563eb;
    }
    .page-content strong {
      font-weight: 600;
    }
    .page-content em {
      font-style: italic;
    }
    .page-content u {
      text-decoration: underline;
    }
    .page-content img {
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
          to="/pages"
          className="flex items-center text-blue-600 hover:text-blue-800">
          <FaArrowLeft className="mr-2" /> Back to Pages List
        </Link>
        <div className="flex gap-4">
          <Link
            to={`/pages/edit/${id}`}
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
          <h1 className="text-2xl font-bold text-gray-800">{page.title}</h1>
          <div className="flex flex-wrap gap-4 mt-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              page.isPublished 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {page.isPublished ? 'Published' : 'Draft'}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              page.showInNavbar 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {page.showInNavbar ? 'Visible in Navbar' : 'Hidden from Navbar'}
            </span>
            {page.showInNavbar && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                Navbar Order: {page.navbarOrder}
              </span>
            )}
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Slug</h2>
            <p className="text-gray-600">/{page.slug}</p>
          </div>

          {page.metaTitle && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Meta Title</h2>
              <p className="text-gray-600">{page.metaTitle}</p>
            </div>
          )}

          {page.metaDescription && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Meta Description</h2>
              <p className="text-gray-600">{page.metaDescription}</p>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Content</h2>
            <style dangerouslySetInnerHTML={{ __html: richTextStyles }} />
            <div 
              className="page-content"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-700">Public Preview</h2>
        </div>
        <div className="p-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">How this page will appear to visitors:</h3>
            <div className="mt-4 p-4 bg-white rounded border border-gray-200">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{page.title}</h1>
              <div 
                className="page-content"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>URL: https://yourdomain.com/{page.slug}</p>
              {page.showInNavbar && (
                <p className="mt-1">This page will appear in the main navigation menu.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageView;