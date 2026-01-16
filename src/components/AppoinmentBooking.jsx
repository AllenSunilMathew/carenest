import React, { useState, useEffect } from 'react';

function AppointmentBooking() {
  const [formData, setFormData] = useState({
    doctor: '',
    specialization: '',
    date: '',
    time: '',
    appointmentType: 'consultation',
    symptoms: '',
    phone: '',
    notes: ''
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample doctors data
  useEffect(() => {
    const sampleDoctors = [
      { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', experience: '15 years', rating: 4.8, availability: ['Mon', 'Wed', 'Fri'], image: '👩‍⚕️', fee: 200 },
      { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurologist', experience: '12 years', rating: 4.7, availability: ['Tue', 'Thu', 'Sat'], image: '👨‍⚕️', fee: 180 },
      { id: 3, name: 'Dr. Emily Williams', specialization: 'Pediatrician', experience: '10 years', rating: 4.9, availability: ['Mon', 'Tue', 'Wed', 'Fri'], image: '👩‍⚕️', fee: 150 },
      { id: 4, name: 'Dr. Robert Davis', specialization: 'Orthopedic', experience: '18 years', rating: 4.6, availability: ['Wed', 'Thu', 'Sat'], image: '👨‍⚕️', fee: 220 },
      { id: 5, name: 'Dr. Priya Sharma', specialization: 'Dermatologist', experience: '8 years', rating: 4.8, availability: ['Mon', 'Thu', 'Fri'], image: '👩‍⚕️', fee: 160 },
      { id: 6, name: 'Dr. James Wilson', specialization: 'General Physician', experience: '20 years', rating: 4.9, availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], image: '👨‍⚕️', fee: 120 },
      { id: 7, name: 'Dr. Lisa Park', specialization: 'Gynecologist', experience: '14 years', rating: 4.7, availability: ['Tue', 'Thu', 'Sat'], image: '👩‍⚕️', fee: 190 },
      { id: 8, name: 'Dr. Thomas Baker', specialization: 'Psychiatrist', experience: '16 years', rating: 4.8, availability: ['Mon', 'Wed', 'Fri'], image: '👨‍⚕️', fee: 210 },
    ];
    setDoctors(sampleDoctors);
  }, []);

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const startTime = 9; // 9 AM
    const endTime = 18; // 6 PM
    
    for (let hour = startTime; hour < endTime; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    return slots.filter(slot => !['12:30', '13:00'].includes(slot)); // Remove lunch time
  };

  useEffect(() => {
    setAvailableSlots(generateTimeSlots());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDoctorSelect = (doctor) => {
    if (selectedDoctors.some(d => d.id === doctor.id)) {
      // Remove doctor if already selected
      setSelectedDoctors(prev => prev.filter(d => d.id !== doctor.id));
    } else {
      // Add doctor if not already selected
      setSelectedDoctors(prev => [...prev, doctor]);
    }
  };

  const calculateTotalFee = () => {
    return selectedDoctors.reduce((total, doctor) => total + doctor.fee, 0);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newBookingId = `APP${Date.now().toString().slice(-6)}`;
      setBookingId(newBookingId);
      setBookingSuccess(true);
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  // Print function with all details
  const handlePrint = () => {
    const totalFee = calculateTotalFee();
    
    const printContent = `
      <html>
        <head>
          <title>Doctor Appointment Booking Confirmation</title>
          <style>
            @media print {
              body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                color: #333;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #0ea5e9;
                padding-bottom: 20px;
              }
              .tick {
                font-size: 72px;
                color: #0ea5e9;
                margin-bottom: 10px;
              }
              .booking-id {
                background-color: #f0f9ff;
                padding: 10px 20px;
                border-radius: 8px;
                font-size: 18px;
                font-weight: bold;
                color: #0369a1;
                margin: 15px auto;
                display: inline-block;
              }
              .section {
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 1px solid #e5e7eb;
              }
              .section-title {
                font-size: 16px;
                font-weight: bold;
                color: #0369a1;
                margin-bottom: 10px;
                padding-left: 10px;
                border-left: 4px solid #0ea5e9;
              }
              .details-grid {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 10px;
                margin-top: 10px;
              }
              .detail-label {
                font-weight: 600;
                color: #4b5563;
              }
              .detail-value {
                color: #1f2937;
              }
              .selected-doctors {
                background-color: #f8fafc;
                padding: 15px;
                border-radius: 8px;
                margin-top: 10px;
                border: 1px solid #e5e7eb;
              }
              .doctor-item {
                margin-bottom: 12px;
                padding-bottom: 12px;
                border-bottom: 1px dashed #d1d5db;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .doctor-item:last-child {
                border-bottom: none;
              }
              .footer {
                margin-top: 30px;
                text-align: center;
                font-size: 12px;
                color: #6b7280;
                border-top: 1px solid #e5e7eb;
                padding-top: 20px;
              }
              .total-fee {
                font-size: 20px;
                font-weight: bold;
                color: #0369a1;
                text-align: right;
                margin-top: 15px;
              }
              .location {
                background-color: #eff6ff;
                padding: 15px;
                border-radius: 8px;
                border: 1px solid #dbeafe;
                margin-top: 10px;
              }
              @page {
                margin: 0.5in;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="tick">✓</div>
            <h1 style="color: #0369a1; margin-bottom: 10px;">Doctor Appointment Booking Confirmation</h1>
            <div style="color: #6b7280; margin-bottom: 15px;">Your appointment has been successfully confirmed</div>
            <div class="booking-id">Booking ID: ${bookingId}</div>
          </div>

          <div class="section">
            <div class="section-title">Appointment Details</div>
            <div class="details-grid">
              <div class="detail-label">Booking Date:</div>
              <div class="detail-value">${new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>
              
              <div class="detail-label">Appointment Date:</div>
              <div class="detail-value">${formData.date} at ${formData.time}</div>
              
              <div class="detail-label">Appointment Type:</div>
              <div class="detail-value">${formData.appointmentType.charAt(0).toUpperCase() + formData.appointmentType.slice(1)}</div>
              
              <div class="detail-label">Total Doctors:</div>
              <div class="detail-value">${selectedDoctors.length} doctor(s)</div>
            </div>
          </div>

          

         
           

          
            <div>
              This is an electronic confirmation. Please bring this printout to the hospital.<br>
              Generated on: ${new Date().toLocaleString()}<br>
              Confirmation ID: ${bookingId}
            </div>
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Delay printing to ensure content is loaded
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const filteredDoctors = searchQuery 
    ? doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : doctors;

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px',
  };

  const titleStyle = {
    fontSize: '42px',
    fontWeight: '700',
    background: 'linear-gradient(to right, #0ea5e9, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '15px',
  };

  const subtitleStyle = {
    fontSize: '18px',
    color: '#64748b',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  };

  const progressBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '50px',
    position: 'relative',
  };

  const progressStepStyle = (isActive, isCompleted) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: '1',
    position: 'relative',
  });

  const stepNumberStyle = (isActive, isCompleted) => ({
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
    backgroundColor: isCompleted ? '#10b981' : isActive ? '#0ea5e9' : '#e2e8f0',
    color: isCompleted || isActive ? 'white' : '#94a3b8',
    border: isActive ? '3px solid #0ea5e9' : 'none',
    boxShadow: isActive ? '0 0 0 5px rgba(14, 165, 233, 0.2)' : 'none',
  });

  const stepLabelStyle = (isActive) => ({
    fontSize: '14px',
    fontWeight: '600',
    color: isActive ? '#0ea5e9' : '#94a3b8',
  });

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
    marginBottom: '30px',
  };

  const doctorsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    marginTop: '30px',
  };

  const doctorCardStyle = (isSelected) => ({
    backgroundColor: isSelected ? '#f0f9ff' : 'white',
    borderRadius: '15px',
    padding: '25px',
    border: isSelected ? '2px solid #0ea5e9' : '2px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
  });

  const doctorImageStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#e0f2fe',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    marginBottom: '15px',
  };

  const doctorFeeStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#0ea5e9',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    marginTop: '30px',
  };

  const formGroupStyle = {
    marginBottom: '25px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#475569',
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    backgroundColor: '#f8fafc',
  };

  const focusedInputStyle = {
    ...inputStyle,
    borderColor: '#0ea5e9',
    boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.1)',
    outline: 'none',
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 15px center',
    backgroundSize: '20px',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical',
    fontFamily: 'inherit',
  };

  const timeSlotsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '12px',
    marginTop: '10px',
  };

  const timeSlotStyle = (isSelected) => ({
    padding: '12px',
    borderRadius: '10px',
    border: isSelected ? '2px solid #0ea5e9' : '2px solid #e2e8f0',
    backgroundColor: isSelected ? '#f0f9ff' : 'white',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: isSelected ? '600' : '500',
    color: isSelected ? '#0ea5e9' : '#475569',
  });

  const buttonStyle = (isPrimary = true) => ({
    background: isPrimary ? 'linear-gradient(to right, #0ea5e9, #3b82f6)' : 'transparent',
    color: isPrimary ? 'white' : '#0ea5e9',
    border: isPrimary ? 'none' : '2px solid #0ea5e9',
    padding: '16px 40px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  });

  const successCardStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '50px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
  };

  const infoBoxStyle = {
    backgroundColor: '#f0f9ff',
    padding: '20px',
    borderRadius: '15px',
    marginBottom: '30px',
    border: '1px solid #e0f2fe',
  };

  const selectedDoctorsStyle = {
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    border: '1px solid #e2e8f0',
  };

  const searchBarStyle = {
    width: '100%',
    padding: '15px 20px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '16px',
    marginBottom: '30px',
    boxSizing: 'border-box',
    backgroundColor: '#f8fafc',
  };

  const [focusedField, setFocusedField] = useState(null);

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Book Appointment</h1>
          <p style={subtitleStyle}>
            Schedule your visit with our expert doctors. Choose from available time slots and get instant confirmation.
          </p>
        </div>

        {/* Progress Bar */}
        <div style={progressBarStyle}>
          <div style={progressStepStyle(step === 1, step > 1)}>
            <div style={stepNumberStyle(step === 1, step > 1)}>1</div>
            <div style={stepLabelStyle(step === 1)}>Select Doctor</div>
          </div>
          <div style={progressStepStyle(step === 2, step > 2)}>
            <div style={stepNumberStyle(step === 2, step > 2)}>2</div>
            <div style={stepLabelStyle(step === 2)}>Choose Time</div>
          </div>
          <div style={progressStepStyle(step === 3, step > 3)}>
            <div style={stepNumberStyle(step === 3, step > 3)}>3</div>
            <div style={stepLabelStyle(step === 3)}>Confirmation</div>
          </div>
        </div>

        {/* Step 1: Doctor Selection */}
        {step === 1 && (
          <div style={cardStyle}>
            <h2 style={{fontSize: '28px', fontWeight: '600', marginBottom: '10px', color: '#1e293b'}}>
              Select Your Doctors
            </h2>
            <p style={{color: '#64748b', marginBottom: '20px'}}>
              Select multiple doctors for your appointment (Click to select/deselect)
            </p>

            {/* Selected Doctors Summary */}
            {selectedDoctors.length > 0 && (
              <div style={selectedDoctorsStyle}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                  <div style={{fontWeight: '600', color: '#1e293b'}}>
                    Selected Doctors: {selectedDoctors.length} doctor(s)
                  </div>
                  <div style={{fontWeight: '700', color: '#0ea5e9', fontSize: '18px'}}>
                    Total: $${calculateTotalFee()}
                  </div>
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                  {selectedDoctors.map((doctor, index) => (
                    <div key={doctor.id} style={{
                      backgroundColor: '#0ea5e9',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '15px',
                      fontSize: '14px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      {doctor.name}
                      <button
                        onClick={() => handleDoctorSelect(doctor)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '16px',
                          padding: '0',
                          width: '18px',
                          height: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Bar */}
            <input
              type="text"
              placeholder="🔍 Search for doctors by name or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={searchBarStyle}
            />

            <div style={doctorsGridStyle}>
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  style={doctorCardStyle(selectedDoctors.some(d => d.id === doctor.id))}
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <div style={doctorFeeStyle}>${doctor.fee}</div>
                  {selectedDoctors.some(d => d.id === doctor.id) && (
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      backgroundColor: '#0ea5e9',
                      color: 'white',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                    }}>
                      ✓
                    </div>
                  )}
                  <div style={doctorImageStyle}>
                    {doctor.image}
                  </div>
                  <div>
                    <div style={{fontSize: '18px', fontWeight: '600', marginBottom: '5px', color: '#1e293b'}}>
                      {doctor.name}
                    </div>
                    <div style={{color: '#0ea5e9', fontWeight: '600', marginBottom: '8px'}}>
                      {doctor.specialization}
                    </div>
                    <div style={{fontSize: '14px', color: '#64748b', marginBottom: '8px'}}>
                      {doctor.experience} experience • ⭐ {doctor.rating}
                    </div>
                    <div style={{fontSize: '13px', color: '#94a3b8', marginBottom: '5px'}}>
                      Available: {doctor.availability.join(', ')}
                    </div>
                    <div style={{fontSize: '14px', fontWeight: '600', color: '#0ea5e9'}}>
                      Consultation Fee: ${doctor.fee}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '40px'}}>
              <div></div>
              <button
                style={buttonStyle(true)}
                onClick={() => selectedDoctors.length > 0 && setStep(2)}
                disabled={selectedDoctors.length === 0}
              >
                {selectedDoctors.length > 0 ? `Next: Schedule ${selectedDoctors.length} Appointment(s)` : 'Select Doctors to Continue'}
                <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Appointment Details */}
        {step === 2 && (
          <div style={cardStyle}>
            <h2 style={{fontSize: '28px', fontWeight: '600', marginBottom: '10px', color: '#1e293b'}}>
              Appointment Details
            </h2>
            <p style={{color: '#64748b', marginBottom: '30px'}}>
              Fill in your details and choose a convenient time
            </p>

            {/* Selected Doctors Info */}
            {selectedDoctors.length > 0 && (
              <div style={infoBoxStyle}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                  <div>
                    <div style={{fontSize: '18px', fontWeight: '600', color: '#1e293b'}}>
                      Selected Doctors ({selectedDoctors.length})
                    </div>
                    <div style={{color: '#0ea5e9', fontWeight: '600'}}>
                      Total Fee: $${calculateTotalFee()}
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      background: 'none',
                      border: '1px solid #e0f2fe',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      color: '#0ea5e9',
                      cursor: 'pointer',
                      fontWeight: '600',
                    }}
                  >
                    Change Doctors
                  </button>
                </div>
                <div style={{marginTop: '15px'}}>
                  {selectedDoctors.map((doctor, index) => (
                    <div key={doctor.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 0',
                      borderBottom: index < selectedDoctors.length - 1 ? '1px solid #e0f2fe' : 'none',
                    }}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <div style={{...doctorImageStyle, width: '40px', height: '40px', fontSize: '18px'}}>
                          {doctor.image}
                        </div>
                        <div>
                          <div style={{fontWeight: '600', color: '#1e293b'}}>{doctor.name}</div>
                          <div style={{fontSize: '14px', color: '#64748b'}}>{doctor.specialization}</div>
                        </div>
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <div style={{fontWeight: '600', color: '#0ea5e9'}}>${doctor.fee}</div>
                        <div style={{fontSize: '14px', color: '#64748b'}}>{doctor.experience}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleBook}>
              <div style={formGridStyle}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Appointment Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('date')}
                    onBlur={() => setFocusedField(null)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    style={focusedField === 'date' ? focusedInputStyle : inputStyle}
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Appointment Type</label>
                  <select
                    name="appointmentType"
                    value={formData.appointmentType}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('type')}
                    onBlur={() => setFocusedField(null)}
                    style={focusedField === 'type' ? {...focusedInputStyle, ...selectStyle} : {...inputStyle, ...selectStyle}}
                  >
                    <option value="consultation">Consultation</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="checkup">Routine Checkup</option>
                    <option value="emergency">Emergency Visit</option>
                    <option value="vaccination">Vaccination</option>
                  </select>
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="+1 (555) 123-4567"
                    required
                    style={focusedField === 'phone' ? focusedInputStyle : inputStyle}
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Main Symptoms (Optional)</label>
                  <input
                    type="text"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('symptoms')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Describe your symptoms..."
                    style={focusedField === 'symptoms' ? focusedInputStyle : inputStyle}
                  />
                </div>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Select Time Slot</label>
                <div style={timeSlotsGridStyle}>
                  {availableSlots.map((slot, index) => (
                    <div
                      key={index}
                      style={timeSlotStyle(formData.time === slot)}
                      onClick={() => setFormData(prev => ({ ...prev, time: slot }))}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Additional Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('notes')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Any additional information for the doctor..."
                  style={focusedField === 'notes' ? {...focusedInputStyle, ...textareaStyle} : {...inputStyle, ...textareaStyle}}
                />
              </div>

              <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '40px'}}>
                <button
                  type="button"
                  style={buttonStyle(false)}
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  style={buttonStyle(true)}
                  disabled={loading || !formData.date || !formData.time || !formData.phone}
                >
                  {loading ? (
                    <>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '3px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                      }}></div>
                      Booking Appointment...
                    </>
                  ) : (
                    `Book ${selectedDoctors.length} Appointment(s)`
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Success Message */}
        {step === 3 && (
          <div style={successCardStyle}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(to right, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              color: 'white',
              margin: '0 auto 30px',
            }}>
              ✓
            </div>
            
            <h2 style={{fontSize: '32px', fontWeight: '700', marginBottom: '15px', color: '#1e293b'}}>
              Appointment(s) Confirmed!
            </h2>
            
            <p style={{fontSize: '18px', color: '#64748b', marginBottom: '30px', maxWidth: '500px', margin: '0 auto'}}>
              Your appointment(s) have been successfully booked. Please arrive 15 minutes early.
            </p>

            <div style={{
              backgroundColor: '#f0f9ff',
              padding: '25px',
              borderRadius: '15px',
              marginBottom: '30px',
              maxWidth: '500px',
              margin: '0 auto',
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                <span style={{color: '#64748b'}}>Booking ID:</span>
                <span style={{fontWeight: '600', color: '#0ea5e9'}}>{bookingId}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                <span style={{color: '#64748b'}}>Total Doctors:</span>
                <span style={{fontWeight: '600'}}>{selectedDoctors.length} doctor(s)</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                <span style={{color: '#64748b'}}>Date & Time:</span>
                <span style={{fontWeight: '600'}}>{formData.date} at {formData.time}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                <span style={{color: '#64748b'}}>Appointment Type:</span>
                <span style={{fontWeight: '600'}}>{formData.appointmentType.charAt(0).toUpperCase() + formData.appointmentType.slice(1)}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{color: '#64748b'}}>Total Fee:</span>
                <span style={{fontSize: '20px', fontWeight: '700', color: '#0ea5e9'}}>$${calculateTotalFee()}</span>
              </div>
            </div>

            <div style={{
              backgroundColor: '#dbeafe',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '30px',
              maxWidth: '500px',
              margin: '0 auto',
              border: '1px solid #bfdbfe',
            }}>
              <div style={{fontWeight: '600', color: '#1e40af', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <span>📍</span> Hospital Location
              </div>
              <div style={{fontSize: '14px', color: '#1e40af'}}>
                Mercy General Hospital<br/>
                123 Medical Plaza, Suite 500<br/>
                Healthcare District, New York, NY 10001<br/>
                Phone: (555) 123-4567
              </div>
            </div>

            <div style={{display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <button
                style={buttonStyle(true)}
                onClick={() => {
                  setStep(1);
                  setBookingSuccess(false);
                  setSelectedDoctors([]);
                  setFormData({
                    doctor: '',
                    specialization: '',
                    date: '',
                    time: '',
                    appointmentType: 'consultation',
                    symptoms: '',
                    phone: '',
                    notes: ''
                  });
                }}
              >
                Book Another Appointment
              </button>
              <button
                style={buttonStyle(false)}
                onClick={handlePrint}
              >
                Print Confirmation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentBooking;