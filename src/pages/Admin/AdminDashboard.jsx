import { FaBuilding, FaCertificate, FaChalkboardTeacher } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FaBuilding className="text-blue-500 text-2xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Total Companies</h3>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FaCertificate className="text-green-500 text-2xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Active Certifications</h3>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FaChalkboardTeacher className="text-purple-500 text-2xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Completed Trainings</h3>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="text-gray-500">No recent activities</div>
      </div>
    </div>
  );
};

export default AdminDashboard;