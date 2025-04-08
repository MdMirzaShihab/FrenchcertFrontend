import { Outlet, Link } from "react-router-dom";
import { FaHome, FaBuilding, FaCertificate, FaChalkboardTeacher, FaSignOutAlt } from "react-icons/fa";

const AdminLayout = () => {
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
              <Link to="/admin/companies" className="flex items-center p-2 rounded hover:bg-blue-700">
                <FaBuilding className="mr-2" /> Companies
              </Link>
            </li>
            <li>
              <Link to="/admin/certifications" className="flex items-center p-2 rounded hover:bg-blue-700">
                <FaCertificate className="mr-2" /> Certifications
              </Link>
            </li>
            <li>
              <Link to="/admin/trainings" className="flex items-center p-2 rounded hover:bg-blue-700">
                <FaChalkboardTeacher className="mr-2" /> Trainings
              </Link>
            </li>
            <li className="absolute bottom-4">
              <button className="flex items-center p-2 rounded hover:bg-blue-700">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;