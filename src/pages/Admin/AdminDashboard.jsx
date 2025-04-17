import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaBuilding, FaCertificate, FaLayerGroup, FaGraduationCap, FaGlobeAmericas, FaChartLine, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { BASE_URL } from "../../secrets";
import 'react-toastify/dist/ReactToastify.css';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [summaryRes, timelineRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/dashboard/summary`),
          axios.get(`${BASE_URL}/api/dashboard/timeline`)
        ]);
        
        setDashboardData(summaryRes.data.data);
        setTimelineData(timelineRes.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError(err.response?.data?.message || 'Failed to load dashboard data');
        toast.error(err.response?.data?.message || 'Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error: </strong> {error}
        </div>
      </div>
    );
  }

  // Prepare chart data
  const statusChartData = {
    labels: dashboardData?.stats.statusDistribution.map(item => item._id),
    datasets: [{
      data: dashboardData?.stats.statusDistribution.map(item => item.count),
      backgroundColor: [
        '#3B82F6', // blue
        '#10B981', // green
        '#F59E0B', // yellow
        '#EF4444'  // red
      ],
      borderWidth: 1
    }]
  };

  const certificationTypeData = {
    labels: dashboardData?.certificationTypes.map(item => item._id),
    datasets: [{
      data: dashboardData?.certificationTypes.map(item => item.count),
      backgroundColor: [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
        '#EC4899', '#14B8A6', '#F97316', '#64748B', '#A855F7'
      ].slice(0, dashboardData?.certificationTypes.length)
    }]
  };

  const timelineChartData = {
    labels: timelineData.map(item => item._id),
    datasets: [{
      label: 'Certifications Issued',
      data: timelineData.map(item => item.count),
      fill: false,
      backgroundColor: '#3B82F6',
      borderColor: '#3B82F6',
      tension: 0.1
    }]
  };

  const geographicalChartData = {
    labels: dashboardData?.geographicalData.map(item => item._id),
    datasets: [{
      label: 'Companies by Country',
      data: dashboardData?.geographicalData.map(item => item.count),
      backgroundColor: '#10B981',
      borderColor: '#10B981',
      borderWidth: 1
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your certification management system</p>
      </header>

      <div className="mb-6">
        <div className="flex space-x-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-4 py-2 font-medium ${activeTab === 'activities' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Recent Activities
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 font-medium ${activeTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Analytics
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaBuilding className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Total Companies</h3>
                <p className="text-2xl font-bold text-gray-800">{dashboardData?.counts.companies}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaCertificate className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Total Certifications</h3>
                <p className="text-2xl font-bold text-gray-800">{dashboardData?.counts.certifications}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex items-start">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <FaLayerGroup className="text-purple-600 text-xl" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Total Fields</h3>
                <p className="text-2xl font-bold text-gray-800">{dashboardData?.counts.fields}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex items-start">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaGraduationCap className="text-yellow-600 text-xl" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Total Trainings</h3>
                <p className="text-2xl font-bold text-gray-800">{dashboardData?.counts.trainings}</p>
              </div>
            </div>
          </div>

          {/* Alerts Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FaExclamationTriangle className="text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-800">Certifications Expiring Soon</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-2">{dashboardData?.stats.expiringSoon}</p>
              <p className="text-sm text-gray-500">Within the next 30 days</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <FaExclamationTriangle className="text-red-600" />
                </div>
                <h3 className="font-medium text-gray-800">Recently Expired</h3>
              </div>
              <p className="text-3xl font-bold text-red-600 mb-2">{dashboardData?.stats.recentExpired}</p>
              <p className="text-sm text-gray-500">In the last 30 days</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FaGlobeAmericas className="text-green-600" />
                </div>
                <h3 className="font-medium text-gray-800">Top Countries</h3>
              </div>
              <div className="h-40">
                <Bar 
                  data={geographicalChartData} 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="font-medium text-gray-800 mb-4">Certification Status Distribution</h3>
            <div className="h-64">
              <Pie 
                data={statusChartData} 
                options={{ 
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'right' } }
                }} 
              />
            </div>
          </div>
        </>
      )}

      {activeTab === 'activities' && (
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-medium text-gray-800">Recent Activities</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            <div className="p-6">
              <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                <FaCertificate className="mr-2 text-blue-500" /> Latest Certifications
              </h4>
              {dashboardData?.activities.certifications.map((cert, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">{cert.company?.name}</span> received 
                    <span className="font-medium text-gray-800"> {cert.certification?.name}</span> certification
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(cert.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6">
              <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                <FaBuilding className="mr-2 text-green-500" /> New Companies
              </h4>
              {dashboardData?.activities.companies.map((company, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">{company.name}</span> registered
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(company.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6">
              <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                <FaLayerGroup className="mr-2 text-purple-500" /> New Fields
              </h4>
              {dashboardData?.activities.fields.map((field, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <p className="text-sm text-gray-600">
                    New field <span className="font-medium text-gray-800">{field.name}</span> added
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(field.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-medium text-gray-800 mb-4 flex items-center">
              <FaChartLine className="mr-2 text-blue-500" /> Certification Timeline
            </h3>
            <div className="h-80">
              <Line 
                data={timelineChartData} 
                options={{ 
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: { beginAtZero: true }
                  }
                }} 
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-medium text-gray-800 mb-4 flex items-center">
              <FaCertificate className="mr-2 text-green-500" /> Certification Types
            </h3>
            <div className="h-80">
              <Pie 
                data={certificationTypeData} 
                options={{ 
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'right' } }
                }} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;