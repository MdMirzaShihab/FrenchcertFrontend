import { Outlet, Link } from "react-router-dom";
import { FaHome, FaBuilding, FaCertificate, FaChalkboardTeacher, FaSignOutAlt, FaClipboardList, FaFileAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const AdminLayout = ({children}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-4">
        <div className="text-2xl font-bold mb-8">FrenchCert Admin</div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/admin" className="flex items-center p-2 rounded hover:bg-blue-700">
                <FaHome className="mr-2" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/companies" className="flex items-center p-2 rounded hover:bg-blue-700">
                <FaBuilding className="mr-2" /> Companies
              </Link>
            </li>
            <li>
              <Link to="/certifications" className="flex items-center p-2 rounded hover:bg-blue-700">
                <FaCertificate className="mr-2" /> Certifications
              </Link>
            </li>
            <li>
              <Link to="/trainings" className="flex items-center p-2 rounded hover:bg-blue-700">
                <FaChalkboardTeacher className="mr-2" /> Trainings
              </Link>
            </li>
            <li>
              <Link to="/fields" className="flex items-center p-2 rounded hover:bg-blue-700">
                <FaClipboardList className="mr-2" /> Fields
              </Link>
            </li>
            <li>
              <Link to="/pages" className="flex items-center p-2 rounded hover:bg-blue-700">
                <FaFileAlt className="mr-2" /> Pages
              </Link>
            </li>
            <li className="absolute bottom-4">
              <button onClick={handleLogout} className="flex items-center p-2 rounded hover:bg-blue-700">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main>{children}</main>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;