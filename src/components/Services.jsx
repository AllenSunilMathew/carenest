import React, { useState } from 'react';

const Services = () => {
  const [hoveredService, setHoveredService] = useState(null);
  
  const servicesStyle = {
    padding: '100px 20px',
    backgroundColor: '#f8fafc',
  };
  
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };
  
  const sectionHeaderStyle = {
    textAlign: 'center',
    marginBottom: '60px',
  };
  
  const sectionTitleStyle = {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '20px',
    background: 'linear-gradient(to right, #0ea5e9, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
  
  const sectionSubtitleStyle = {
    fontSize: '18px',
    color: '#64748b',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  };
  
  const servicesGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  };
  
  const serviceCardStyle = {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.4s ease',
    border: '2px solid transparent',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };
  
  const serviceCardHoverStyle = {
    ...serviceCardStyle,
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(14, 165, 233, 0.15)',
    borderColor: '#0ea5e9',
  };
  
  const serviceIconStyle = {
    width: '70px',
    height: '70px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    marginBottom: '30px',
    background: 'linear-gradient(to right, #0ea5e9, #3b82f6)',
    color: 'white',
  };
  
  const serviceTitleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#1e293b',
  };
  
  const serviceDescriptionStyle = {
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '20px',
    flexGrow: '1',
  };
  
  const learnMoreStyle = {
    color: '#0ea5e9',
    textDecoration: 'none',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    marginTop: 'auto',
  };
  
  const hospitalServicesData = [
    {
      id: 1,
      title: 'Emergency Care',
      description: '24/7 emergency medical services with rapid response teams and state-of-the-art facilities for critical situations.',
      icon: '🚑',
      features: ['Trauma Care', 'Cardiac Emergency', 'Pediatric ER', 'Stroke Center']
    },
    {
      id: 2,
      title: 'Cardiology',
      description: 'Comprehensive heart care including diagnostics, treatment, and rehabilitation for all cardiac conditions.',
      icon: '❤️',
      features: ['Echocardiography', 'Angioplasty', 'Cardiac Surgery', 'Rehabilitation']
    },
    {
      id: 3,
      title: 'Neurology',
      description: 'Expert care for brain and nervous system disorders with advanced diagnostic and treatment options.',
      icon: '🧠',
      features: ['EEG/EMG', 'Stroke Care', 'Epilepsy Treatment', 'Neuro Surgery']
    },
    {
      id: 4,
      title: 'Maternity & Child Care',
      description: 'Complete care for mothers and babies from prenatal to postnatal with modern birthing facilities.',
      icon: '👶',
      features: ['Labor & Delivery', 'NICU', 'Pediatrics', 'Vaccination']
    },
    {
      id: 5,
      title: 'Orthopedics',
      description: 'Advanced bone and joint care including sports injuries, fractures, and joint replacement surgeries.',
      icon: '🦴',
      features: ['Joint Replacement', 'Sports Medicine', 'Spine Care', 'Physiotherapy']
    },
    {
      id: 6,
      title: 'Diagnostic Imaging',
      description: 'Advanced imaging technology including MRI, CT Scan, X-Ray, and Ultrasound for accurate diagnosis.',
      icon: '📷',
      features: ['MRI Scan', 'CT Scan', 'Digital X-Ray', 'Ultrasound']
    },
    {
      id: 7,
      title: 'Oncology',
      description: 'Comprehensive cancer care with chemotherapy, radiation therapy, and surgical oncology services.',
      icon: '🎗️',
      features: ['Chemotherapy', 'Radiation', 'Surgical Oncology', 'Palliative Care']
    },
    {
      id: 8,
      title: 'Dental Care',
      description: 'Complete dental solutions including cosmetic dentistry, implants, and pediatric dental care.',
      icon: '🦷',
      features: ['Dental Implants', 'Cosmetic Dentistry', 'Oral Surgery', 'Pediatric Dental']
    },
    {
      id: 9,
      title: 'Mental Health',
      description: 'Professional psychiatric and psychological services for mental wellness and emotional support.',
      icon: '🧠',
      features: ['Psychotherapy', 'Counseling', 'Addiction Treatment', 'Stress Management']
    }
  ];
  
  return (
    <section id="services" style={servicesStyle}>
      <div style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>Medical Services</h2>
          <p style={sectionSubtitleStyle}>
            Comprehensive healthcare services delivered with compassion and cutting-edge medical technology.
          </p>
        </div>
        
        <div style={servicesGridStyle}>
          {hospitalServicesData.map((service) => (
            <div
              key={service.id}
              style={hoveredService === service.id ? serviceCardHoverStyle : serviceCardStyle}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div style={serviceIconStyle}>
                {service.icon}
              </div>
              <h3 style={serviceTitleStyle}>{service.title}</h3>
              <p style={serviceDescriptionStyle}>{service.description}</p>
              
              <div style={{marginTop: '20px'}}>
                {service.features.map((feature, index) => (
                  <span
                    key={index}
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#f0f9ff',
                      color: '#0ea5e9',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      marginRight: '8px',
                      marginBottom: '8px',
                      fontWeight: '500',
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              <a href="#" style={{...learnMoreStyle, marginTop: '20px'}}>
                View Details
                <span style={{marginLeft: '8px', fontSize: '18px'}}>→</span>
              </a>
            </div>
          ))}
        </div>
        
        {/* Additional hospital info */}
        <div style={{
          marginTop: '60px',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{fontSize: '36px', fontWeight: '700', color: '#0ea5e9'}}>24/7</div>
            <div style={{color: '#64748b', fontWeight: '600'}}>Emergency Services</div>
          </div>
          <div>
            <div style={{fontSize: '36px', fontWeight: '700', color: '#3b82f6'}}>200+</div>
            <div style={{color: '#64748b', fontWeight: '600'}}>Expert Doctors</div>
          </div>
          <div>
            <div style={{fontSize: '36px', fontWeight: '700', color: '#0ea5e9'}}>50+</div>
            <div style={{color: '#64748b', fontWeight: '600'}}>Specialties</div>
          </div>
          <div>
            <div style={{fontSize: '36px', fontWeight: '700', color: '#3b82f6'}}>95%</div>
            <div style={{color: '#64748b', fontWeight: '600'}}>Patient Satisfaction</div>
          </div>
          
          <button style={{
            background: 'linear-gradient(to right, #0ea5e9, #3b82f6)',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(14, 165, 233, 0.2)',
            display: 'flex',
            alignItems: 'center',
          }}>
            View All Departments
            <span style={{marginLeft: '10px', fontSize: '20px'}}>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;