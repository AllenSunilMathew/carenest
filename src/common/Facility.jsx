import React, { useState } from 'react';

const Facilities = () => {
  const [selectedFacility, setSelectedFacility] = useState(1);
  const [hoveredFacility, setHoveredFacility] = useState(null);
  
  const facilitiesStyle = {
    padding: '80px 20px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
  };
  
  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
  };
  
  const headerStyle = {
    textAlign: 'center',
    marginBottom: '60px',
  };
  
  const titleStyle = {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '20px',
    background: 'linear-gradient(to right, #0ea5e9, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
  
  const subtitleStyle = {
    fontSize: '18px',
    color: '#64748b',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.6',
  };
  
  const contentStyle = {
    display: 'grid',
    gridTemplateColumns: '350px 1fr',
    gap: '40px',
  };
  
  const sidebarStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    height: 'fit-content',
    position: 'sticky',
    top: '100px',
  };
  
  const facilityListStyle = {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  };
  
  const facilityItemStyle = {
    padding: '20px',
    borderRadius: '15px',
    marginBottom: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  };
  
  const facilityItemActiveStyle = {
    ...facilityItemStyle,
    backgroundColor: '#0ea5e9',
    color: 'white',
    transform: 'translateX(10px)',
    boxShadow: '0 10px 20px rgba(14, 165, 233, 0.2)',
  };
  
  const facilityItemHoverStyle = {
    ...facilityItemStyle,
    backgroundColor: '#f0f9ff',
    transform: 'translateX(5px)',
  };
  
  const facilityIconStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    flexShrink: '0',
  };
  
  const facilityIconActiveStyle = {
    ...facilityIconStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  };
  
  const facilityIconInactiveStyle = {
    ...facilityIconStyle,
    backgroundColor: '#f0f9ff',
    color: '#0ea5e9',
  };
  
  const facilityContentStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    minHeight: '500px',
  };
  
  const facilityImageStyle = {
    width: '100%',
    height: '350px',
    borderRadius: '15px',
    objectFit: 'cover',
    marginBottom: '30px',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
  };
  
  const facilityTitleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#1e293b',
  };
  
  const facilityDescriptionStyle = {
    fontSize: '16px',
    color: '#64748b',
    lineHeight: '1.8',
    marginBottom: '30px',
  };
  
  const equipmentGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '30px',
  };
  
  const equipmentItemStyle = {
    backgroundColor: '#f0f9ff',
    padding: '15px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };
  
  const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };
  
  const facilitiesData = [
    {
      id: 1,
      title: 'Emergency & Trauma Center',
      icon: '🚑',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Our state-of-the-art Emergency Department operates 24/7 with dedicated trauma bays, resuscitation rooms, and rapid response teams. Equipped to handle all medical emergencies with immediate care protocols.',
      equipment: [
        'Advanced Life Support Ambulances',
        'Trauma Bays with Vital Monitors',
        'Digital X-Ray & CT Scanner',
        'Portable Ultrasound Machines',
        'Defibrillators & Ventilators'
      ],
      features: [
        'Triage area with rapid assessment',
        'Isolation rooms for infectious cases',
        'Pediatric emergency section',
        'Direct access to operation theaters'
      ],
      stats: { beds: '25', responseTime: '2 mins', staff: '15 doctors + 30 nurses' }
    },
    {
      id: 2,
      title: 'Advanced Operation Theaters',
      icon: '🔬',
      image: 'https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Modular operation theaters with laminar airflow, advanced anesthesia machines, and robotic surgery systems. Designed for maximum sterility and equipped for complex surgical procedures.',
      equipment: [
        'Da Vinci Robotic Surgery System',
        'Laminar Air Flow Systems',
        '4K HD Laparoscopic Systems',
        'Advanced Anesthesia Machines',
        'Intraoperative Imaging (C-Arm)'
      ],
      features: [
        'HEPA filtered air circulation',
        'Integrated audiovisual systems',
        'Separate clean and dirty corridors',
        'Post-anesthesia care unit (PACU)'
      ],
      stats: { theaters: '8', laminarFlow: '100%', successRate: '99.5%' }
    },
    {
      id: 3,
      title: 'ICU & Critical Care',
      icon: '💓',
      image: 'https://images.unsplash.com/photo-1584467735871-8db9ac8c85b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Comprehensive intensive care units with advanced monitoring systems, specialized for medical, surgical, cardiac, and neonatal critical care needs.',
      equipment: [
        'Multi-parameter Patient Monitors',
        'Ventilators with Advanced Modes',
        'Intra-aortic Balloon Pump',
        'CRRT Machines',
        'Bedside Ultrasound'
      ],
      features: [
        '1:1 nurse-patient ratio',
        'Negative pressure isolation rooms',
        'Central monitoring station',
        'Family waiting lounge'
      ],
      stats: { beds: '40', nurseRatio: '1:1', survivalRate: '94%' }
    },
    {
      id: 4,
      title: 'Diagnostic Imaging Center',
      icon: '📷',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Comprehensive imaging services with cutting-edge technology for accurate diagnosis including MRI, CT, PET-CT, ultrasound, and digital radiography.',
      equipment: [
        '3 Tesla MRI Scanner',
        '256-Slice CT Scanner',
        'Digital Mammography',
        '4D Ultrasound Systems',
        'PET-CT Scan Machine'
      ],
      features: [
        'Low radiation dose protocols',
        'PACS system for digital storage',
        'Teleradiology services',
        'Same-day reporting'
      ],
      stats: { scansDaily: '150+', reportingTime: '2 hours', accuracy: '99.8%' }
    },
    {
      id: 5,
      title: 'Cardiac Catheterization Lab',
      icon: '❤️',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Advanced cardiac intervention facility for angiography, angioplasty, pacemaker implantation, and electrophysiology studies.',
      equipment: [
        'Biplane Cath Lab System',
        'IVUS & FFR Equipment',
        'Rotational Atherectomy',
        '3D Cardiac Mapping',
        'IABP & ECMO Support'
      ],
      features: [
        '24/7 STEMI service',
        'Hybrid operation theater',
        'Post-procedure recovery area',
        'Cardiac rehabilitation'
      ],
      stats: { procedures: '1000+/year', doorToBalloon: '< 60 mins', successRate: '98%' }
    },
    {
      id: 6,
      title: 'Maternity & NICU',
      icon: '👶',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Comprehensive maternity care with luxurious labor rooms, advanced neonatal ICU, and specialized care for high-risk pregnancies.',
      equipment: [
        'Fetal Monitors with Telemetry',
        'Neonatal Ventilators',
        'Phototherapy Units',
        'Breast Milk Analyzer',
        'Water Birth Facilities'
      ],
      features: [
        'LDR (Labor-Delivery-Recovery) rooms',
        'Level III NICU',
        'Lactation consultation',
        'Prenatal classes'
      ],
      stats: { deliveries: '3000+/year', nicuBeds: '30', cSectionRate: '25%' }
    },
    {
      id: 7,
      title: 'Cancer Treatment Center',
      icon: '🎗️',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Comprehensive cancer care with advanced radiation therapy, chemotherapy suites, and surgical oncology facilities.',
      equipment: [
        'Linear Accelerator (LINAC)',
        'Brachytherapy Unit',
        'PET-CT for Staging',
        'Chemotherapy Biosafety Cabinets',
        'Cryoablation Systems'
      ],
      features: [
        'Radiation shielding bunkers',
        'Chemotherapy day care',
        'Palliative care unit',
        'Genetic counseling'
      ],
      stats: { patientsTreated: '2000+/year', radiationModes: '5', successRate: '85%' }
    },
    {
      id: 8,
      title: 'Rehabilitation Center',
      icon: '⚕️',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Comprehensive physical and occupational therapy facilities with advanced equipment for post-surgical recovery and chronic condition management.',
      equipment: [
        'Robotic Gait Trainer',
        'Hydrotherapy Pool',
        'Therapeutic Ultrasound',
        'EMG Biofeedback',
        'Virtual Reality Systems'
      ],
      features: [
        'Gym with parallel bars',
        'Aquatic therapy section',
        'Occupational therapy kitchen',
        'Speech therapy rooms'
      ],
      stats: { therapists: '25', sessionsDaily: '150+', recoveryRate: '92%' }
    }
  ];
  
  const selectedFacilityData = facilitiesData.find(f => f.id === selectedFacility);
  
  return (
    <section style={facilitiesStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Our Medical Facilities</h1>
          <p style={subtitleStyle}>
            Explore our state-of-the-art medical facilities equipped with cutting-edge technology 
            and staffed by expert healthcare professionals to provide comprehensive care.
          </p>
        </div>
        
        <div style={contentStyle}>
          <div style={sidebarStyle}>
            <h3 style={{marginBottom: '25px', fontSize: '20px', color: '#1e293b', fontWeight: '600'}}>
              Facilities Overview
            </h3>
            <ul style={facilityListStyle}>
              {facilitiesData.map((facility) => (
                <li
                  key={facility.id}
                  style={
                    selectedFacility === facility.id 
                      ? facilityItemActiveStyle 
                      : hoveredFacility === facility.id 
                        ? facilityItemHoverStyle 
                        : facilityItemStyle
                  }
                  onClick={() => setSelectedFacility(facility.id)}
                  onMouseEnter={() => setHoveredFacility(facility.id)}
                  onMouseLeave={() => setHoveredFacility(null)}
                >
                  <div style={
                    selectedFacility === facility.id 
                      ? facilityIconActiveStyle 
                      : facilityIconInactiveStyle
                  }>
                    {facility.icon}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      fontSize: '16px',
                      color: selectedFacility === facility.id ? 'white' : '#1e293b',
                    }}>
                      {facility.title}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Facility Stats Summary */}
            <div style={{
              marginTop: '40px',
              padding: '25px',
              backgroundColor: '#f0f9ff',
              borderRadius: '15px',
            }}>
              <h4 style={{marginBottom: '15px', color: '#1e293b', fontWeight: '600'}}>
                Hospital at a Glance
              </h4>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '28px', fontWeight: '700', color: '#0ea5e9'}}>500+</div>
                  <div style={{fontSize: '14px', color: '#64748b'}}>Hospital Beds</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '28px', fontWeight: '700', color: '#3b82f6'}}>50+</div>
                  <div style={{fontSize: '14px', color: '#64748b'}}>Operation Theaters</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '28px', fontWeight: '700', color: '#0ea5e9'}}>24/7</div>
                  <div style={{fontSize: '14px', color: '#64748b'}}>Emergency</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '28px', fontWeight: '700', color: '#3b82f6'}}>100%</div>
                  <div style={{fontSize: '14px', color: '#64748b'}}>Digital Records</div>
                </div>
              </div>
            </div>
          </div>
          
          <div style={facilityContentStyle}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px',
            }}>
              <h2 style={facilityTitleStyle}>{selectedFacilityData.title}</h2>
              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '10px 20px',
                borderRadius: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: '600',
                color: '#0ea5e9',
              }}>
                <span style={{fontSize: '20px'}}>{selectedFacilityData.icon}</span>
                Facility #{selectedFacilityData.id}
              </div>
            </div>
            
            <div style={{
              width: '100%',
              height: '350px',
              borderRadius: '15px',
              backgroundColor: '#e2e8f0',
              marginBottom: '30px',
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${selectedFacilityData.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: '15px 25px',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                }}>
                  <div style={{fontSize: '14px', color: '#64748b', marginBottom: '5px'}}>Key Statistics</div>
                  <div style={{display: 'flex', gap: '30px'}}>
                    {Object.entries(selectedFacilityData.stats).map(([key, value]) => (
                      <div key={key} style={{textAlign: 'center'}}>
                        <div style={{fontSize: '22px', fontWeight: '700', color: '#0ea5e9'}}>{value}</div>
                        <div style={{fontSize: '12px', color: '#64748b', textTransform: 'capitalize'}}>
                          {key.replace(/([A-Z])/g, ' $1')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <p style={facilityDescriptionStyle}>{selectedFacilityData.description}</p>
            
            <div style={{marginBottom: '40px'}}>
              <h3 style={sectionTitleStyle}>
                <span style={{fontSize: '24px'}}>⚙️</span> Advanced Equipment
              </h3>
              <div style={equipmentGridStyle}>
                {selectedFacilityData.equipment.map((item, index) => (
                  <div key={index} style={equipmentItemStyle}>
                    <span style={{color: '#0ea5e9', fontSize: '20px'}}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 style={sectionTitleStyle}>
                <span style={{fontSize: '24px'}}>⭐</span> Special Features
              </h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px'}}>
                {selectedFacilityData.features.map((feature, index) => (
                  <div key={index} style={{
                    backgroundColor: '#fef3c7',
                    padding: '15px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                  }}>
                    <span style={{color: '#d97706', fontSize: '20px', flexShrink: '0'}}>✦</span>
                    <span style={{color: '#92400e'}}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{
              marginTop: '40px',
              padding: '25px',
              backgroundColor: '#f0f9ff',
              borderRadius: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
            }}>
              <div>
                <div style={{fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '5px'}}>
                  Interested in this facility?
                </div>
                <div style={{color: '#64748b'}}>
                  Book a tour or consultation with our specialists
                </div>
              </div>
              <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
                <button style={{
                  background: 'linear-gradient(to right, #0ea5e9, #3b82f6)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '50px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <span>📞</span> Book Consultation
                </button>
                <button style={{
                  background: 'white',
                  color: '#0ea5e9',
                  border: '2px solid #0ea5e9',
                  padding: '12px 30px',
                  borderRadius: '50px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <span>📅</span> Schedule Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;