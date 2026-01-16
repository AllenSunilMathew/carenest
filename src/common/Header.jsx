import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ isAuthenticated, userName, userRole, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        {/* Logo */}
        <div style={logoStyle} onClick={() => navigate('/')}>
          <div style={logoIconStyle}>🏥</div>
          <div>
            <div style={logoTitleStyle}>MediCare+</div>
            <div style={logoSubtitleStyle}>Healthcare Solutions</div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={navStyle}>
          <Link to="/" style={navLinkStyle}>Home</Link>
          <Link to="/about" style={navLinkStyle}>About</Link>
          <Link to="/services" style={navLinkStyle}>Services</Link>
          <Link to="/facilty" style={navLinkStyle}>Facilities</Link>
          <Link to="/contact" style={navLinkStyle}>Contact</Link>
          
          {isAuthenticated && (
            <>
              {userRole === 'admin' ? (
                <Link to="/adminpage" style={navLinkStyle}>Admin Dashboard</Link>
              ) : (
                <Link to="/user" style={navLinkStyle}>My Dashboard</Link>
              )}
              <Link to="/appoinmentbook" style={navLinkStyle}>Book Appointment</Link>
              <Link to="/labbook" style={navLinkStyle}>Lab Tests</Link>
            </>
          )}
        </nav>

        {/* User Section */}
        <div style={userSectionStyle}>
          {isAuthenticated ? (
            <>
              <div style={userInfoStyle}>
                <div style={avatarStyle}>
                  {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>
                    {userName || 'User'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {userRole === 'admin' ? 'Admin' : 'Patient'}
                  </div>
                </div>
              </div>
              <button onClick={handleLogout} style={logoutButtonStyle}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={loginButtonStyle}>
                Login
              </Link>
              <Link to="/register" style={registerButtonStyle}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

// Styles
const headerStyle = {
  backgroundColor: 'white',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '15px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
};

const logoIconStyle = {
  fontSize: '32px',
};

const logoTitleStyle = {
  fontSize: '22px',
  fontWeight: '700',
  background: 'linear-gradient(to right, #0ea5e9, #3b82f6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const logoSubtitleStyle = {
  fontSize: '12px',
  color: '#64748b',
};

const navStyle = {
  display: 'flex',
  gap: '25px',
  alignItems: 'center',
};

const navLinkStyle = {
  textDecoration: 'none',
  color: '#475569',
  fontWeight: '500',
  fontSize: '15px',
  transition: 'color 0.3s ease',
};

const userSectionStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
};

const userInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const avatarStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'linear-gradient(to right, #0ea5e9, #3b82f6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: '600',
  fontSize: '16px',
};

const loginButtonStyle = {
  padding: '10px 20px',
  backgroundColor: 'transparent',
  color: '#0ea5e9',
  border: '2px solid #0ea5e9',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: '600',
  transition: 'all 0.3s ease',
};

const registerButtonStyle = {
  padding: '10px 20px',
  background: 'linear-gradient(to right, #0ea5e9, #3b82f6)',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: '600',
  transition: 'all 0.3s ease',
};

const logoutButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#ef4444',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

export default Header;