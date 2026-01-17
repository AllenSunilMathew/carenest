import React, { useState } from 'react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!formData.agreeToTerms) {
      alert('Please agree to the Terms and Conditions');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Registration successful!\nWelcome ${formData.firstName} ${formData.lastName}`);
      setLoading(false);
    }, 1500);
  };
  
  // Styles
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)',
    padding: '20px',
  };
  
  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    padding: '40px',
    width: '100%',
    maxWidth: '480px',
    position: 'relative',
    overflow: 'hidden',
  };
  
  const headerStyle = {
    textAlign: 'center',
    marginBottom: '32px',
  };
  
  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    background: 'linear-gradient(to right, #2575fc, #6a11cb)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
  };
  
  const subtitleStyle = {
    fontSize: '16px',
    color: '#666',
  };
  
  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '10px',
  };
  
  const inputContainerStyle = {
    marginBottom: '20px',
  };
  
  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#333',
  };
  
  const baseInputStyle = {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: '2px solid #e1e5e9',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    backgroundColor: '#f8fafc',
  };
  
  const getInputStyle = (fieldName) => {
    return focusedField === fieldName 
      ? { ...baseInputStyle, borderColor: '#6a11cb', boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.1)', outline: 'none' }
      : baseInputStyle;
  };
  
  const buttonStyle = {
    width: '100%',
    padding: '18px',
    background: 'linear-gradient(to right, #2575fc, #6a11cb)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const hoverButtonStyle = {
    ...buttonStyle,
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(37, 117, 252, 0.2)',
  };
  
  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '24px',
    marginTop: '10px',
  };
  
  const checkboxStyle = {
    width: '18px',
    height: '18px',
    marginRight: '10px',
    marginTop: '3px',
    cursor: 'pointer',
    accentColor: '#6a11cb',
    flexShrink: '0',
  };
  
  const checkboxLabelStyle = {
    fontSize: '14px',
    color: '#555',
    cursor: 'pointer',
    lineHeight: '1.5',
  };
  
  const linkStyle = {
    color: '#6a11cb',
    textDecoration: 'none',
    fontWeight: '600',
  };
  
  const dividerStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '30px 0',
    color: '#888',
  };
  
  const lineStyle = {
    flex: '1',
    height: '1px',
    backgroundColor: '#ddd',
  };
  
  const dividerTextStyle = {
    padding: '0 15px',
    fontSize: '14px',
  };
  
  const socialButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px',
    borderRadius: '12px',
    border: '2px solid #e1e5e9',
    backgroundColor: 'white',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '12px',
    width: '100%',
  };
  
  const footerStyle = {
    textAlign: 'center',
    marginTop: '30px',
    fontSize: '14px',
    color: '#666',
  };
  
  const passwordStrengthStyle = {
    height: '4px',
    width: '100%',
    backgroundColor: '#e1e5e9',
    borderRadius: '2px',
    marginTop: '8px',
    overflow: 'hidden',
  };
  
  const getPasswordStrength = (password) => {
    if (!password) return { width: '0%', color: '#e1e5e9' };
    if (password.length < 6) return { width: '30%', color: '#ff4757' };
    if (password.length < 8) return { width: '60%', color: '#ffa502' };
    return { width: '100%', color: '#2ed573' };
  };
  
  const passwordStrengthBar = getPasswordStrength(formData.password);
  
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'linear-gradient(to right, rgba(37, 117, 252, 0.1), rgba(106, 17, 203, 0.1))',
          zIndex: '0',
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-60px',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: 'linear-gradient(to right, rgba(106, 17, 203, 0.1), rgba(37, 117, 252, 0.1))',
          zIndex: '0',
        }}></div>
        
        <div style={{position: 'relative', zIndex: '1'}}>
          <div style={headerStyle}>
            <h1 style={titleStyle}>Create Account</h1>
            <p style={subtitleStyle}>Join our community today</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div style={formGridStyle}>
              <div style={inputContainerStyle}>
                <label style={labelStyle}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John"
                  required
                  style={getInputStyle('firstName')}
                />
              </div>
              
              <div style={inputContainerStyle}>
                <label style={labelStyle}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Doe"
                  required
                  style={getInputStyle('lastName')}
                />
              </div>
            </div>
            
            <div style={inputContainerStyle}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="you@example.com"
                required
                style={getInputStyle('email')}
              />
            </div>
            
            <div style={inputContainerStyle}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                placeholder="Create a strong password"
                required
                style={getInputStyle('password')}
              />
              <div style={passwordStrengthStyle}>
                <div style={{
                  height: '100%',
                  width: passwordStrengthBar.width,
                  backgroundColor: passwordStrengthBar.color,
                  transition: 'all 0.3s ease',
                }}></div>
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                {formData.password && (
                  <span>Strength: {
                    passwordStrengthBar.width === '30%' ? 'Weak' :
                    passwordStrengthBar.width === '60%' ? 'Medium' : 'Strong'
                  }</span>
                )}
              </div>
            </div>
            
            <div style={inputContainerStyle}>
              <label style={labelStyle}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('confirmPassword')}
                onBlur={() => setFocusedField(null)}
                placeholder="Re-enter your password"
                required
                style={getInputStyle('confirmPassword')}
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div style={{ fontSize: '12px', color: '#ff4757', marginTop: '4px' }}>
                  Passwords do not match
                </div>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password.length > 0 && (
                <div style={{ fontSize: '12px', color: '#2ed573', marginTop: '4px' }}>
                  Passwords match ✓
                </div>
              )}
            </div>
            
            <div style={checkboxContainerStyle}>
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                style={checkboxStyle}
              />
              <label htmlFor="agreeToTerms" style={checkboxLabelStyle}>
                I agree to the <a href="#" style={linkStyle}>Terms and Conditions</a> and <a href="#" style={linkStyle}>Privacy Policy</a>
              </label>
            </div>
            
            <button
              type="submit"
              style={isButtonHovered ? hoverButtonStyle : buttonStyle}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg style={{width: '20px', height: '20px', marginRight: '10px'}} viewBox="0 0 50 50">
                    <circle style={{fill: 'none', stroke: 'white', strokeWidth: '4', strokeLinecap: 'round', cx: '25', cy: '25', r: '20'}}></circle>
                  </svg>
                  Creating Account...
                </>
              ) : 'Create Account'}
            </button>
          </form>
          
          <div style={dividerStyle}>
            <div style={lineStyle}></div>
            <div style={dividerTextStyle}>Or sign up with</div>
            <div style={lineStyle}></div>
          </div>
          
          <div>
          
            
          
          </div>
          
          <div style={footerStyle}>
            <p>Already have an account? <a href="/login" style={linkStyle}>Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;