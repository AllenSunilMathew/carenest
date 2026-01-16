import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const heroStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  };
  
  const heroContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  };
  
  const heroTextStyle = {
    flex: '1',
    minWidth: '300px',
    paddingRight: '40px',
  };
  
  const heroTitleStyle = {
    fontSize: '64px',
    fontWeight: '800',
    lineHeight: '1.2',
    marginBottom: '20px',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
  
  const heroSubtitleStyle = {
    fontSize: '20px',
    color: '#555',
    marginBottom: '40px',
    lineHeight: '1.6',
  };
  
  const ctaButtonStyle = {
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    color: 'white',
    border: 'none',
    padding: '18px 40px',
    borderRadius: '50px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(106, 17, 203, 0.3)',
    display: 'inline-flex',
    alignItems: 'center',
  };
  
  const heroImageStyle = {
    flex: '1',
    minWidth: '300px',
    textAlign: 'center',
  };
  
  const floatingElementStyle = {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'linear-gradient(to right, rgba(106, 17, 203, 0.1), rgba(37, 117, 252, 0.1))',
    filter: 'blur(60px)',
  };
  
  return (
    
    <section id="home" style={heroStyle}>
      <div style={{...floatingElementStyle, top: '-100px', right: '-100px'}}></div>
      <div style={{...floatingElementStyle, bottom: '-100px', left: '-100px'}}></div>
      
      <div style={heroContentStyle}>
        <div style={heroTextStyle}>
          <h1 style={heroTitleStyle}>
            Transform Your Health Experience
          </h1>
          <p style={heroSubtitleStyle}>
            We build compassionate digital health experiences that enhance patient care and wellness. Join healthcare providers making a meaningful impact with modern technology.
          </p>
         <Link to="/appoinmentbook">
              <button  style={ctaButtonStyle}>
                Start Your Journey
                <span style={{marginLeft: '10px', fontSize: '20px'}}>→</span>
              </button>
         </Link>
          
          <div style={{marginTop: '40px', display: 'flex', gap: '30px'}}>
            <div>
              <div style={{fontSize: '36px', fontWeight: '700', color: '#6a11cb'}}>10K+</div>
              <div style={{color: '#666'}}>Happy Clients</div>
            </div>
            <div>
              <div style={{fontSize: '36px', fontWeight: '700', color: '#2575fc'}}>24/7</div>
              <div style={{color: '#666'}}>Support</div>
            </div>
            <div>
              <div style={{fontSize: '36px', fontWeight: '700', color: '#6a11cb'}}>99%</div>
              <div style={{color: '#666'}}>Satisfaction</div>
            </div>
          </div>
        </div>
        
        <div style={heroImageStyle}>
          <div style={{
            width: '400px',
            height: '400px',
            borderRadius: '30px',
            background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
            position: 'relative',
            boxShadow: '0 30px 60px rgba(106, 17, 203, 0.3)',
            transform: 'rotate(5deg)',
            animation: 'float 6s ease-in-out infinite',
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '20px',
              bottom: '20px',
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: '#333'}}>
                Health Preview
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} style={{
                    height: '60px',
                    background: 'linear-gradient(to right, #f5f7fa, #e4e8f0)',
                    borderRadius: '10px',
                  }}></div>
                ))}
              </div>
              <div style={{
                height: '100px',
                background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                borderRadius: '10px',
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
              }}>
                Analytics Overview
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;