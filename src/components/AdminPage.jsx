import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    username: 'Admin User',
    email: 'admin@hospital.com',
    role: 'Super Admin',
    lastLogin: '2024-01-15 10:30 AM'
  });

  const [stats, setStats] = useState({
    totalAppointments: 1247,
    todayAppointments: 24,
    totalLabTests: 892,
    todayLabTests: 15,
    pendingAppointments: 8,
    pendingLabResults: 23,
    revenue: 125400,
    activeDoctors: 16
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [recentLabBookings, setRecentLabBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-01-15'
  });

// In AdminPage component
useEffect(() => {
  fetchDashboardData();
}, []);

const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem('token');
    
    // Fetch dashboard stats
    const statsResponse = await fetch('http://localhost:5000/api/admin/dashboard-stats', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (statsResponse.ok) {
      const statsData = await statsResponse.json();
      
      setStats({
        totalAppointments: statsData.stats.totalAppointments,
        todayAppointments: statsData.stats.todayAppointments,
        totalLabTests: statsData.stats.totalLabTests,
        todayLabTests: statsData.stats.todayLabTests,
        pendingAppointments: statsData.stats.pendingAppointments,
        pendingLabResults: statsData.stats.pendingLabResults,
        revenue: statsData.stats.totalRevenue,
        activeDoctors: statsData.stats.activeDoctors
      });

      setRecentBookings(statsData.recentAppointments);
      setRecentLabBookings(statsData.recentLabTests);
    }
  } catch (error) {
    console.error('Error fetching admin data:', error);
    toast.error('Failed to load admin dashboard data');
  }
};




  // Sample appointment data
  useEffect(() => {
    const appointments = [
      { id: 'APP001', patient: 'John Smith', doctor: 'Dr. Sarah Johnson', date: '2024-01-15', time: '10:30 AM', type: 'Consultation', status: 'Confirmed', amount: 200 },
      { id: 'APP002', patient: 'Emma Wilson', doctor: 'Dr. Michael Chen', date: '2024-01-15', time: '11:00 AM', type: 'Follow-up', status: 'Pending', amount: 150 },
      { id: 'APP003', patient: 'Robert Brown', doctor: 'Dr. Emily Williams', date: '2024-01-15', time: '2:00 PM', type: 'Checkup', status: 'Confirmed', amount: 120 },
      { id: 'APP004', patient: 'Lisa Davis', doctor: 'Dr. Robert Davis', date: '2024-01-16', time: '9:00 AM', type: 'Consultation', status: 'Cancelled', amount: 220 },
      { id: 'APP005', patient: 'Michael Johnson', doctor: 'Dr. Priya Sharma', date: '2024-01-16', time: '3:30 PM', type: 'Vaccination', status: 'Confirmed', amount: 160 },
      { id: 'APP006', patient: 'Sarah Miller', doctor: 'Dr. James Wilson', date: '2024-01-17', time: '1:00 PM', type: 'Emergency', status: 'Pending', amount: 300 },
    ];

    const labBookings = [
      { id: 'LAB001', patient: 'John Smith', test: 'Complete Blood Count', date: '2024-01-15', time: '9:00 AM', status: 'Completed', amount: 45, report: 'Available' },
      { id: 'LAB002', patient: 'Emma Wilson', test: 'Thyroid Panel', date: '2024-01-15', time: '10:30 AM', status: 'In Progress', amount: 80, report: 'Pending' },
      { id: 'LAB003', patient: 'Robert Brown', test: 'MRI Scan', date: '2024-01-15', time: '2:00 PM', status: 'Scheduled', amount: 450, report: 'Pending' },
      { id: 'LAB004', patient: 'Lisa Davis', test: 'Lipid Profile', date: '2024-01-16', time: '8:30 AM', status: 'Completed', amount: 60, report: 'Available' },
      { id: 'LAB005', patient: 'Michael Johnson', test: 'COVID-19 PCR', date: '2024-01-16', time: '11:00 AM', status: 'Completed', amount: 100, report: 'Available' },
      { id: 'LAB006', patient: 'Sarah Miller', test: 'Allergy Panel', date: '2024-01-17', time: '10:00 AM', status: 'Scheduled', amount: 150, report: 'Pending' },
    ];

    setRecentBookings(appointments);
    setRecentLabBookings(labBookings);
  }, []);

  const handleLogout = () => {
    // In a real app, you would clear authentication tokens here
    alert('Successfully logged out');
    navigate('/login');
  };

  const handleExportData = (type) => {
    alert(`Exporting ${type} data...`);
    // In a real app, implement CSV/Excel export logic here
  };

  const handleDeleteBooking = (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type} booking?`)) {
      if (type === 'appointment') {
        setRecentBookings(prev => prev.filter(booking => booking.id !== id));
      } else {
        setRecentLabBookings(prev => prev.filter(booking => booking.id !== id));
      }
      alert(`${type} booking deleted successfully`);
    }
  };

  const updateBookingStatus = (id, type, newStatus) => {
    if (type === 'appointment') {
      setRecentBookings(prev => prev.map(booking => 
        booking.id === id ? { ...booking, status: newStatus } : booking
      ));
    } else {
      setRecentLabBookings(prev => prev.map(booking => 
        booking.id === id ? { ...booking, status: newStatus } : booking
      ));
    }
  };

  // Filter bookings based on search query
  const filteredAppointments = recentBookings.filter(booking =>
    booking.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLabBookings = recentLabBookings.filter(booking =>
    booking.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.test.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const sidebarStyle = {
    width: '260px',
    backgroundColor: '#0f172a',
    color: 'white',
    position: 'fixed',
    height: '100vh',
    padding: '25px 0',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
  };

  const mainContentStyle = {
    marginLeft: '260px',
    padding: '30px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '2px solid #e2e8f0',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  };

  const statCardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
  };

  const buttonStyle = (isPrimary = true) => ({
    background: isPrimary ? 'linear-gradient(to right, #3b82f6, #1d4ed8)' : 'transparent',
    color: isPrimary ? 'white' : '#3b82f6',
    border: isPrimary ? 'none' : '2px solid #3b82f6',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  });

  const tabStyle = (isActive) => ({
    padding: '12px 24px',
    backgroundColor: isActive ? '#3b82f6' : 'transparent',
    color: isActive ? 'white' : '#64748b',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  });

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const tableHeaderStyle = {
    backgroundColor: '#f1f5f9',
    padding: '15px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#475569',
    borderBottom: '2px solid #e2e8f0',
  };

  const tableCellStyle = {
    padding: '15px',
    borderBottom: '1px solid #e2e8f0',
    color: '#475569',
  };

  const statusBadgeStyle = (status) => ({
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: 
      status === 'Confirmed' ? '#d1fae5' :
      status === 'Pending' ? '#fef3c7' :
      status === 'Cancelled' ? '#fee2e2' :
      status === 'Completed' ? '#dbeafe' :
      status === 'In Progress' ? '#f3e8ff' : '#e5e7eb',
    color: 
      status === 'Confirmed' ? '#065f46' :
      status === 'Pending' ? '#92400e' :
      status === 'Cancelled' ? '#991b1b' :
      status === 'Completed' ? '#1e40af' :
      status === 'In Progress' ? '#6b21a8' : '#374151',
  });

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={{ padding: '0 25px 30px', borderBottom: '1px solid #334155' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '5px', color: '#f1f5f9' }}>
            MediCare Admin
          </h2>
          <p style={{ fontSize: '14px', color: '#94a3b8' }}>Hospital Management System</p>
        </div>

        <div style={{ padding: '30px 25px' }}>
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: '600',
                color: 'white',
              }}>
                {adminData.username.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px' }}>{adminData.username}</div>
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>{adminData.role}</div>
              </div>
            </div>
            
            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '5px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                📧 {adminData.email}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                ⏰ Last login: {adminData.lastLogin}
              </span>
            </div>
          </div>

          <nav>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              <li style={{ marginBottom: '10px' }}>
                <button 
                  onClick={() => setActiveTab('overview')}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    textAlign: 'left',
                    backgroundColor: activeTab === 'overview' ? '#1e293b' : 'transparent',
                    color: activeTab === 'overview' ? 'white' : '#cbd5e1',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                  }}
                >
                  📊 Dashboard
                </button>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <button 
                  onClick={() => setActiveTab('appointments')}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    textAlign: 'left',
                    backgroundColor: activeTab === 'appointments' ? '#1e293b' : 'transparent',
                    color: activeTab === 'appointments' ? 'white' : '#cbd5e1',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                  }}
                >
                  🗓️ Appointments
                </button>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <button 
                  onClick={() => setActiveTab('labTests')}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    textAlign: 'left',
                    backgroundColor: activeTab === 'labTests' ? '#1e293b' : 'transparent',
                    color: activeTab === 'labTests' ? 'white' : '#cbd5e1',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                  }}
                >
                  💉 Lab Tests
                </button>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <button 
                  onClick={() => setActiveTab('reports')}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    textAlign: 'left',
                    backgroundColor: activeTab === 'reports' ? '#1e293b' : 'transparent',
                    color: activeTab === 'reports' ? 'white' : '#cbd5e1',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                  }}
                >
                  📈 Reports
                </button>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <button 
                  onClick={() => setActiveTab('settings')}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    textAlign: 'left',
                    backgroundColor: activeTab === 'settings' ? '#1e293b' : 'transparent',
                    color: activeTab === 'settings' ? 'white' : '#cbd5e1',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                  }}
                >
                  ⚙️ Settings
                </button>
              </li>
            </ul>
          </nav>

          <div style={{ position: 'absolute', bottom: '30px', width: '210px' }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '12px 20px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '5px' }}>
              {activeTab === 'overview' ? 'Dashboard Overview' :
               activeTab === 'appointments' ? 'Appointment Management' :
               activeTab === 'labTests' ? 'Lab Test Management' :
               activeTab === 'reports' ? 'Reports & Analytics' :
               'Settings'}
            </h1>
            <p style={{ color: '#64748b' }}>
              Welcome back, {adminData.username}! Here's what's happening today.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '10px 15px',
                borderRadius: '8px',
                border: '2px solid #e2e8f0',
                fontSize: '14px',
                width: '250px',
              }}
            />
            <button
              onClick={() => handleExportData(activeTab)}
              style={buttonStyle(false)}
            >
              📥 Export
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        {activeTab === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {/* Stat Cards */}
              <div style={statCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Total Appointments</div>
                  <div style={{ fontSize: '24px', color: '#3b82f6' }}>📅</div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '5px' }}>
                  {stats.totalAppointments.toLocaleString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10b981', fontSize: '14px' }}>
                  ↑ {stats.todayAppointments} today
                </div>
              </div>

              <div style={statCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Total Lab Tests</div>
                  <div style={{ fontSize: '24px', color: '#10b981' }}>💉</div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '5px' }}>
                  {stats.totalLabTests.toLocaleString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10b981', fontSize: '14px' }}>
                  ↑ {stats.todayLabTests} today
                </div>
              </div>

              <div style={statCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Pending Actions</div>
                  <div style={{ fontSize: '24px', color: '#f59e0b' }}>⚠️</div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '5px' }}>
                  {stats.pendingAppointments + stats.pendingLabResults}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>
                  {stats.pendingAppointments} appointments, {stats.pendingLabResults} lab results
                </div>
              </div>

              <div style={statCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Total Revenue</div>
                  <div style={{ fontSize: '24px', color: '#8b5cf6' }}>💰</div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '5px' }}>
                  ${stats.revenue.toLocaleString()}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>
                  From {stats.activeDoctors} active doctors
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
              {/* Recent Appointments */}
              <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>Recent Appointments</h3>
                  <button 
                    onClick={() => setActiveTab('appointments')}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    View All →
                  </button>
                </div>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={tableHeaderStyle}>Patient</th>
                      <th style={tableHeaderStyle}>Doctor</th>
                      <th style={tableHeaderStyle}>Time</th>
                      <th style={tableHeaderStyle}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.slice(0, 5).map((booking) => (
                      <tr key={booking.id}>
                        <td style={tableCellStyle}>
                          <div style={{ fontWeight: '600', color: '#1e293b' }}>{booking.patient}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{booking.id}</div>
                        </td>
                        <td style={tableCellStyle}>{booking.doctor}</td>
                        <td style={tableCellStyle}>
                          <div>{booking.date}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{booking.time}</div>
                        </td>
                        <td style={tableCellStyle}>
                          <div style={statusBadgeStyle(booking.status)}>{booking.status}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Recent Lab Tests */}
              <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>Recent Lab Tests</h3>
                  <button 
                    onClick={() => setActiveTab('labTests')}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    View All →
                  </button>
                </div>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={tableHeaderStyle}>Patient</th>
                      <th style={tableHeaderStyle}>Test</th>
                      <th style={tableHeaderStyle}>Amount</th>
                      <th style={tableHeaderStyle}>Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLabBookings.slice(0, 5).map((booking) => (
                      <tr key={booking.id}>
                        <td style={tableCellStyle}>
                          <div style={{ fontWeight: '600', color: '#1e293b' }}>{booking.patient}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{booking.id}</div>
                        </td>
                        <td style={tableCellStyle}>{booking.test}</td>
                        <td style={tableCellStyle}>
                          <div style={{ fontWeight: '600', color: '#10b981' }}>${booking.amount}</div>
                        </td>
                        <td style={tableCellStyle}>
                          <div style={statusBadgeStyle(booking.status)}>{booking.status}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Appointments Management */}
        {activeTab === 'appointments' && (
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '10px' }}>Appointment Management</h2>
                <p style={{ color: '#64748b' }}>Manage and track all patient appointments</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                />
                <button style={buttonStyle(true)}>Filter</button>
              </div>
            </div>

            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Booking ID</th>
                  <th style={tableHeaderStyle}>Patient</th>
                  <th style={tableHeaderStyle}>Doctor</th>
                  <th style={tableHeaderStyle}>Date & Time</th>
                  <th style={tableHeaderStyle}>Type</th>
                  <th style={tableHeaderStyle}>Amount</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((booking) => (
                  <tr key={booking.id}>
                    <td style={{...tableCellStyle, fontWeight: '600', color: '#3b82f6'}}>{booking.id}</td>
                    <td style={tableCellStyle}>{booking.patient}</td>
                    <td style={tableCellStyle}>{booking.doctor}</td>
                    <td style={tableCellStyle}>
                      <div>{booking.date}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{booking.time}</div>
                    </td>
                    <td style={tableCellStyle}>{booking.type}</td>
                    <td style={{...tableCellStyle, fontWeight: '600', color: '#10b981'}}>${booking.amount}</td>
                    <td style={tableCellStyle}>
                      <select
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking.id, 'appointment', e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: 'white',
                          fontSize: '14px',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td style={tableCellStyle}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => alert(`View details for ${booking.id}`)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(booking.id, 'appointment')}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Lab Tests Management */}
        {activeTab === 'labTests' && (
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '10px' }}>Lab Test Management</h2>
                <p style={{ color: '#64748b' }}>Manage and track all laboratory tests</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={buttonStyle(true)}>+ Add New Test</button>
              </div>
            </div>

            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Booking ID</th>
                  <th style={tableHeaderStyle}>Patient</th>
                  <th style={tableHeaderStyle}>Test</th>
                  <th style={tableHeaderStyle}>Date & Time</th>
                  <th style={tableHeaderStyle}>Amount</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={tableHeaderStyle}>Report</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLabBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td style={{...tableCellStyle, fontWeight: '600', color: '#10b981'}}>{booking.id}</td>
                    <td style={tableCellStyle}>{booking.patient}</td>
                    <td style={tableCellStyle}>{booking.test}</td>
                    <td style={tableCellStyle}>
                      <div>{booking.date}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{booking.time}</div>
                    </td>
                    <td style={{...tableCellStyle, fontWeight: '600', color: '#10b981'}}>${booking.amount}</td>
                    <td style={tableCellStyle}>
                      <select
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking.id, 'lab', e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: 'white',
                          fontSize: '14px',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td style={tableCellStyle}>
                      <span style={statusBadgeStyle(booking.report === 'Available' ? 'Completed' : 'Pending')}>
                        {booking.report}
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => alert(`View report for ${booking.id}`)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(booking.id, 'lab')}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reports & Analytics */}
        {activeTab === 'reports' && (
          <div style={cardStyle}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' }}>Reports & Analytics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Revenue Overview</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Appointments Revenue:</span>
                  <span style={{ fontWeight: '600' }}>$89,200</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Lab Tests Revenue:</span>
                  <span style={{ fontWeight: '600' }}>$36,200</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span>Total Revenue:</span>
                  <span style={{ fontWeight: '700', color: '#10b981' }}>$125,400</span>
                </div>
              </div>

              <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Monthly Statistics</h3>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Appointments:</span>
                    <span style={{ fontWeight: '600' }}>124</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', marginTop: '5px' }}>
                    <div style={{ width: '85%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '3px' }}></div>
                  </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Lab Tests:</span>
                    <span style={{ fontWeight: '600' }}>89</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', marginTop: '5px' }}>
                    <div style={{ width: '65%', height: '100%', backgroundColor: '#10b981', borderRadius: '3px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div style={cardStyle}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' }}>Admin Settings</h2>
            <div style={{ maxWidth: '500px' }}>
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569' }}>Username</label>
                <input
                  type="text"
                  value={adminData.username}
                  onChange={(e) => setAdminData(prev => ({ ...prev, username: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontSize: '16px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569' }}>Email</label>
                <input
                  type="email"
                  value={adminData.email}
                  onChange={(e) => setAdminData(prev => ({ ...prev, email: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontSize: '16px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569' }}>Change Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontSize: '16px',
                    marginBottom: '10px',
                  }}
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontSize: '16px',
                  }}
                />
              </div>
              <button style={buttonStyle(true)}>Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;