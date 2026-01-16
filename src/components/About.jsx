import React from 'react';
import { Link } from 'react-router-dom';

const HospitalAbout = () => {
  const aboutStyle = {
    padding: '100px 20px',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
  };
  
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    flexWrap: 'wrap',
  };
  
  const aboutImageStyle = {
    flex: '1',
    minWidth: '300px',
    position: 'relative',
  };
  
  const aboutContentStyle = {
    flex: '1',
    minWidth: '300px',
  };
  
  const sectionTitleStyle = {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '30px',
    background: 'linear-gradient(to right, #0ea5e9, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
  
  const textStyle = {
    fontSize: '18px',
    color: '#475569',
    lineHeight: '1.8',
    marginBottom: '30px',
  };
  
  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '30px',
    marginTop: '40px',
  };
  
  const statItemStyle = {
    textAlign: 'center',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
  };
  
  const statValueStyle = {
    fontSize: '48px',
    fontWeight: '700',
    color: '#0ea5e9',
    marginBottom: '10px',
  };
  
  const statLabelStyle = {
    fontSize: '18px',
    color: '#64748b',
    fontWeight: '600',
  };
  
  return (
    <section id="about" style={aboutStyle}>
      <div style={containerStyle}>
        <div style={aboutImageStyle}>
          <div style={{
            width: '100%',
            height: '500px',
            borderRadius: '30px',
            background: 'linear-gradient(45deg, #0ea5e9, #3b82f6)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(14, 165, 233, 0.2)',
          }}>
            <div style={{
              position: 'absolute',
              top: '30px',
              left: '30px',
              right: '30px',
              bottom: '30px',
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <div style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'linear-gradient(to right, #0ea5e9, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '60px',
                color: 'white',
                marginBottom: '30px',
              }}>
                🏥
              </div>
              <div style={{fontSize: '28px', fontWeight: '600', textAlign: 'center', color: '#1e293b'}}>
                Caring Since 1995
              </div>
              <div style={{fontSize: '16px', textAlign: 'center', color: '#64748b', marginTop: '20px'}}>
                A legacy of healing and compassion
              </div>
            </div>
            
            {/* Floating elements - medical themed */}
            <div style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(to right, rgba(14, 165, 233, 0.2), rgba(59, 130, 246, 0.2))',
              top: '50px',
              right: '50px',
              animation: 'float 3s ease-in-out infinite',
            }}></div>
            <div style={{
              position: 'absolute',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(14, 165, 233, 0.2))',
              bottom: '50px',
              left: '50px',
              animation: 'float 4s ease-in-out infinite',
              animationDelay: '0.5s',
            }}></div>
          </div>
        </div>
        
        <div style={aboutContentStyle}>
          <h2 style={sectionTitleStyle}>About Mercy General Hospital</h2>
          
          <p style={textStyle}>
            Founded in 1995, Mercy General Hospital has been at the forefront of medical excellence, 
            providing comprehensive healthcare services to our community. Our dedicated team of 
            healthcare professionals works tirelessly to deliver exceptional patient care with 
            compassion and expertise.
          </p>
          
          <p style={textStyle}>
            We believe in a patient-centered approach that combines cutting-edge medical technology 
            with personalized care. Our state-of-the-art facilities and experienced medical staff 
            ensure that every patient receives the highest standard of treatment in a comfortable 
            and healing environment.
          </p>
          
          <div style={statsContainerStyle}>
            <div style={statItemStyle}>
              <div style={statValueStyle}>25+</div>
              <div style={statLabelStyle}>Years of Service</div>
            </div>
            
            <div style={statItemStyle}>
              <div style={statValueStyle}>200+</div>
              <div style={statLabelStyle}>Expert Doctors</div>
            </div>
            
            <div style={statItemStyle}>
              <div style={statValueStyle}>500+</div>
              <div style={statLabelStyle}>Medical Staff</div>
            </div>
            
            <div style={statItemStyle}>
              <div style={statValueStyle}>95%</div>
              <div style={statLabelStyle}>Patient Satisfaction</div>
            </div>
          </div>
          
          <div style={{display: 'flex', gap: '20px', marginTop: '40px', flexWrap: 'wrap'}}>
            <button style={{
              background: 'linear-gradient(to right, #0ea5e9, #3b82f6)',
              color: 'white',
              border: 'none',
              padding: '16px 40px',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(14, 165, 233, 0.2)',
              display: 'flex',
              alignItems: 'center',
            }}>
              Meet Our Doctors
              <span style={{marginLeft: '10px', fontSize: '20px'}}>→</span>
            </button>
        <Link to={'/facilty'}>
                
                <button style={{
                  background: 'transparent',
                  color: '#0ea5e9',
                  border: '2px solid #0ea5e9',
                  padding: '16px 40px',
                  borderRadius: '50px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  View Facilities
                  <span style={{marginLeft: '10px', fontSize: '20px'}}>→</span>
                </button>
        </Link>
          </div>
          
          {/* Medical Accreditation Badges */}
          <div style={{
            marginTop: '40px',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            padding: '25px',
            backgroundColor: 'white',
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
          }}>
            <div style={{fontWeight: '600', color: '#1e293b'}}>Accreditations:</div>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#dcfce7',
              color: '#16a34a',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
            }}>JCI Accredited</div>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#fef3c7',
              color: '#d97706',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
            }}>NABH Certified</div>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#e0f2fe',
              color: '#0284c7',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
            }}>ISO 9001:2015</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalAbout;