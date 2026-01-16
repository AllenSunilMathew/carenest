import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserPage() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [labBookings, setLabBookings] = useState([]);
  const [counts, setCounts] = useState({ 
    appointments: 0, 
    labs: 0, 
    upcoming: 0, 
    completed: 0 
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    patientId: ''
  });

  useEffect(() => {
    fetchUserData();
    fetchDashboardData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserData({
          name: data.user.username,
          email: data.user.email,
          patientId: `PAT${data.user._id.slice(-6).toUpperCase()}`
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch appointments
      const appointmentsResponse = await fetch('http://localhost:5000/api/appointments/my-appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Fetch lab tests
      const labResponse = await fetch('http://localhost:5000/api/lab/my-tests', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (appointmentsResponse.ok) {
        const appointmentsData = await appointmentsResponse.json();
        setAppointments(appointmentsData.appointments);
      }

      if (labResponse.ok) {
        const labData = await labResponse.json();
        setLabBookings(labData.labTests);
      }

      // Calculate counts
      const upcomingCount = appointments.filter(a => 
        a.status === 'confirmed' || a.status === 'pending'
      ).length;
      
      const completedCount = labBookings.filter(l => 
        l.status === 'completed'
      ).length;

      setCounts({
        appointments: appointments.length,
        labs: labBookings.length,
        upcoming: upcomingCount,
        completed: completedCount
      });

      setLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}/cancel`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          toast.success('Appointment cancelled successfully');
          fetchDashboardData(); // Refresh data
        } else {
          toast.error('Failed to cancel appointment');
        }
      } catch (error) {
        console.error('Error cancelling appointment:', error);
        toast.error('Error cancelling appointment');
      }
    }
  };

  const handleDownloadReport = async (labId, reportUrl) => {
    if (!reportUrl) {
      toast.info('Report not available yet');
      return;
    }

    try {
      // In a real app, you would download the file
      window.open(reportUrl, '_blank');
      toast.success('Opening report...');
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('Failed to download report');
    }
  };

  // Add toast notification styles
  const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  // Rest of your styles remain the same...
  // [Keep all your existing styles from the previous UserPage component]

  return (
    <div style={dashboardStyle}>
      <ToastContainer />
      <div style={containerStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <h1 style={titleStyle}>Patient Dashboard</h1>
            <p style={{color: '#64748b', marginTop: '10px'}}>Welcome back! Here's your healthcare overview</p>
          </div>
          
          <div style={userInfoStyle}>
            <div style={avatarStyle}>
              {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div style={{fontWeight: '600', color: '#1e293b'}}>
                {userData.name || 'Loading...'}
              </div>
              <div style={{fontSize: '14px', color: '#64748b'}}>
                Patient ID: {userData.patientId}
              </div>
            </div>
          </div>
        </div>

        {/* Rest of your component remains the same, just update the handlers */}
        {/* ... [Rest of your component code] ... */}
      </div>
    </div>
  );
}

export default UserPage;