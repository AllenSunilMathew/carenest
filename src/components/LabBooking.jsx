import React, { useState, useEffect } from 'react';

function LabBooking() {
  const [formData, setFormData] = useState({
    testCategory: '',
    specificTest: '',
    date: '',
    time: '',
    patientType: 'self',
    fastingRequired: false,
    doctorReferral: '',
    instructions: '',
    phone: '',
    email: ''
  });

  const [availableTests, setAvailableTests] = useState([]);
  const [testCategories, setTestCategories] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample test data
  useEffect(() => {
    const categories = [
      { id: 1, name: 'Blood Tests', icon: '💉', color: '#ef4444' },
      { id: 2, name: 'Imaging', icon: '📷', color: '#3b82f6' },
      { id: 3, name: 'Cardiac', icon: '❤️', color: '#dc2626' },
      { id: 4, name: 'Hormone Tests', icon: '⚖️', color: '#8b5cf6' },
      { id: 5, name: 'Cancer Screening', icon: '🎗️', color: '#db2777' },
      { id: 6, name: 'Allergy Tests', icon: '🤧', color: '#f59e0b' },
      { id: 7, name: 'Genetic Tests', icon: '🧬', color: '#10b981' },
      { id: 8, name: 'Infectious Diseases', icon: '🦠', color: '#0ea5e9' },
    ];
    
    const tests = [
      { id: 1, name: 'Complete Blood Count (CBC)', category: 'Blood Tests', price: 45, duration: '30 mins', fasting: true, reportTime: 'Same Day' },
      { id: 2, name: 'Lipid Profile', category: 'Blood Tests', price: 60, duration: '30 mins', fasting: true, reportTime: '24 hours' },
      { id: 3, name: 'Liver Function Test', category: 'Blood Tests', price: 55, duration: '30 mins', fasting: true, reportTime: 'Same Day' },
      { id: 4, name: 'Kidney Function Test', category: 'Blood Tests', price: 50, duration: '30 mins', fasting: true, reportTime: 'Same Day' },
      { id: 5, name: 'Thyroid Panel', category: 'Hormone Tests', price: 80, duration: '30 mins', fasting: false, reportTime: '48 hours' },
      { id: 6, name: 'Diabetes Panel', category: 'Blood Tests', price: 65, duration: '30 mins', fasting: true, reportTime: 'Same Day' },
      { id: 7, name: 'MRI Scan', category: 'Imaging', price: 450, duration: '1 hour', fasting: false, reportTime: '48 hours' },
      { id: 8, name: 'CT Scan', category: 'Imaging', price: 350, duration: '45 mins', fasting: false, reportTime: '24 hours' },
      { id: 9, name: 'Ultrasound', category: 'Imaging', price: 120, duration: '30 mins', fasting: true, reportTime: 'Same Day' },
      { id: 10, name: 'ECG', category: 'Cardiac', price: 75, duration: '20 mins', fasting: false, reportTime: 'Immediate' },
      { id: 11, name: 'Stress Test', category: 'Cardiac', price: 200, duration: '1 hour', fasting: false, reportTime: '24 hours' },
      { id: 12, name: 'Mammogram', category: 'Cancer Screening', price: 180, duration: '30 mins', fasting: false, reportTime: '48 hours' },
      { id: 13, name: 'PSA Test', category: 'Cancer Screening', price: 90, duration: '30 mins', fasting: false, reportTime: '24 hours' },
      { id: 14, name: 'Allergy Panel', category: 'Allergy Tests', price: 150, duration: '1 hour', fasting: false, reportTime: '72 hours' },
      { id: 15, name: 'COVID-19 PCR', category: 'Infectious Diseases', price: 100, duration: '15 mins', fasting: false, reportTime: '24 hours' },
      { id: 16, name: 'Genetic Screening', category: 'Genetic Tests', price: 300, duration: '30 mins', fasting: false, reportTime: '7 days' },
    ];

    setTestCategories(categories);
    setAvailableTests(tests);
  }, []);

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const startTime = 7; // 7 AM
    const endTime = 19; // 7 PM
    
    for (let hour = startTime; hour < endTime; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    return slots.filter(slot => !['12:30', '13:00'].includes(slot));
  };

  useEffect(() => {
    setAvailableSlots(generateTimeSlots());
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Handle multiple test selection
  const handleTestSelect = (test) => {
    if (selectedTests.some(t => t.id === test.id)) {
      // Remove test if already selected
      setSelectedTests(prev => prev.filter(t => t.id !== test.id));
    } else {
      // Add test if not already selected
      setSelectedTests(prev => [...prev, test]);
    }
  };

  // Check if any test requires fasting
  const checkFastingRequired = () => {
    return selectedTests.some(test => test.fasting);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return selectedTests.reduce((total, test) => total + test.price, 0);
  };

  const filteredTests = searchQuery 
    ? availableTests.filter(test => 
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory
      ? availableTests.filter(test => test.category === selectedCategory.name)
      : availableTests;

  const handleBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newBookingId = `LAB${Date.now().toString().slice(-8)}`;
      setBookingId(newBookingId);
      setBookingSuccess(true);
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  // Print function with all details
  const handlePrint = () => {
    const selectedTestNames = selectedTests.map(test => test.name).join('<br>• ');
    const totalPrice = calculateTotalPrice();
    
    const printContent = `
      <html>
        <head>
          <title>Lab Test Booking Confirmation</title>
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
                border-bottom: 2px solid #10b981;
                padding-bottom: 20px;
              }
              .tick {
                font-size: 72px;
                color: #10b981;
                margin-bottom: 10px;
              }
              .booking-id {
                background-color: #f0fdf4;
                padding: 10px 20px;
                border-radius: 8px;
                font-size: 18px;
                font-weight: bold;
                color: #065f46;
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
                color: #065f46;
                margin-bottom: 10px;
                padding-left: 10px;
                border-left: 4px solid #10b981;
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
              .selected-tests {
                background-color: #f8fafc;
                padding: 15px;
                border-radius: 8px;
                margin-top: 10px;
                border: 1px solid #e5e7eb;
              }
              .test-item {
                margin-bottom: 8px;
                padding-bottom: 8px;
                border-bottom: 1px dashed #d1d5db;
              }
              .test-item:last-child {
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
              .total-price {
                font-size: 20px;
                font-weight: bold;
                color: #065f46;
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
            <h1 style="color: #065f46; margin-bottom: 10px;">Lab Test Booking Confirmation</h1>
            <div style="color: #6b7280; margin-bottom: 15px;">Your booking has been successfully confirmed</div>
            <div class="booking-id">Booking ID: ${bookingId}</div>
          </div>

          <div class="section">
            <div class="section-title">Booking Details</div>
            <div class="details-grid">
              <div class="detail-label">Booking Date:</div>
              <div class="detail-value">${new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>
              
              <div class="detail-label">Test Date:</div>
              <div class="detail-value">${formData.date} at ${formData.time}</div>
              
              <div class="detail-label">Patient Type:</div>
              <div class="detail-value">${formData.patientType.charAt(0).toUpperCase() + formData.patientType.slice(1)}</div>
              
              <div class="detail-label">Total Tests:</div>
              <div class="detail-value">${selectedTests.length} test(s)</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Selected Tests</div>
            <div class="selected-tests">
              ${selectedTests.map(test => `
                <div class="test-item">
                  <div style="font-weight: 600; color: #1f2937;">${test.name}</div>
                  <div style="font-size: 14px; color: #6b7280; margin-top: 4px;">
                    Category: ${test.category} | Duration: ${test.duration} | Report Time: ${test.reportTime}
                    ${test.fasting ? ' | 🕒 Fasting Required' : ''}
                  </div>
                  <div style="text-align: right; color: #065f46; font-weight: 600; margin-top: 5px;">
                    $${test.price}
                  </div>
                </div>
              `).join('')}
              
              <div class="total-price">
                Total Amount: $${totalPrice}
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Location & Instructions</div>
            <div class="location">
              <div style="font-weight: 600; color: #1e40af; margin-bottom: 8px;">📍 Lab Location</div>
              <div style="color: #374151;">
                Mercy General Hospital - Diagnostic Center<br>
                123 Medical Plaza, Level 2<br>
                <span style="font-weight: 600;">Open Hours:</span> Mon-Sat 7:00 AM - 7:00 PM<br>
                <span style="font-weight: 600;">Phone:</span> (555) 123-4567<br>
                <span style="font-weight: 600;">Email:</span> lab@mercyhospital.com
              </div>
            </div>
            
           
            </div>
            
          


         
            <div>
              This is an electronic confirmation. No signature required.<br>
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
    background: 'linear-gradient(to right, #10b981, #059669)',
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
    backgroundColor: isCompleted ? '#10b981' : isActive ? '#10b981' : '#e2e8f0',
    color: isCompleted || isActive ? 'white' : '#94a3b8',
    border: isActive ? '3px solid #10b981' : 'none',
    boxShadow: isActive ? '0 0 0 5px rgba(16, 185, 129, 0.2)' : 'none',
  });

  const stepLabelStyle = (isActive) => ({
    fontSize: '14px',
    fontWeight: '600',
    color: isActive ? '#10b981' : '#94a3b8',
  });

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
    marginBottom: '30px',
  };

  const categoriesGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '30px',
  };

  const categoryCardStyle = (isSelected) => ({
    backgroundColor: isSelected ? '#f0fdf4' : 'white',
    borderRadius: '15px',
    padding: '25px',
    border: isSelected ? '2px solid #10b981' : '2px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  });

  const categoryIconStyle = (color) => ({
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: `${color}15`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    color: color,
  });

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

  const testsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '30px',
  };

  const testCardStyle = (isSelected) => ({
    backgroundColor: isSelected ? '#f0fdf4' : 'white',
    borderRadius: '15px',
    padding: '25px',
    border: isSelected ? '2px solid #10b981' : '2px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
  });

  const testPriceStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#10b981',
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

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 15px center',
    backgroundSize: '20px',
  };

  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px',
  };

  const checkboxStyle = {
    width: '20px',
    height: '20px',
    borderRadius: '5px',
    cursor: 'pointer',
    accentColor: '#10b981',
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
    border: isSelected ? '2px solid #10b981' : '2px solid #e2e8f0',
    backgroundColor: isSelected ? '#f0fdf4' : 'white',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: isSelected ? '600' : '500',
    color: isSelected ? '#10b981' : '#475569',
  });

  const buttonStyle = (isPrimary = true) => ({
    background: isPrimary ? 'linear-gradient(to right, #10b981, #059669)' : 'transparent',
    color: isPrimary ? 'white' : '#10b981',
    border: isPrimary ? 'none' : '2px solid #10b981',
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
    backgroundColor: '#f0fdf4',
    padding: '20px',
    borderRadius: '15px',
    marginBottom: '30px',
    border: '1px solid #bbf7d0',
  };

  const selectedTestsStyle = {
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    border: '1px solid #e2e8f0',
  };

  const [focusedField, setFocusedField] = useState(null);

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Book Lab Test</h1>
          <p style={subtitleStyle}>
            Schedule diagnostic tests with our accredited laboratory. Fast results, accurate reporting.
          </p>
        </div>

        {/* Progress Bar */}
        <div style={progressBarStyle}>
          <div style={progressStepStyle(step === 1, step > 1)}>
            <div style={stepNumberStyle(step === 1, step > 1)}>1</div>
            <div style={stepLabelStyle(step === 1)}>Select Test</div>
          </div>
          <div style={progressStepStyle(step === 2, step > 2)}>
            <div style={stepNumberStyle(step === 2, step > 2)}>2</div>
            <div style={stepLabelStyle(step === 2)}>Schedule & Details</div>
          </div>
          <div style={progressStepStyle(step === 3, step > 3)}>
            <div style={stepNumberStyle(step === 3, step > 3)}>3</div>
            <div style={stepLabelStyle(step === 3)}>Confirmation</div>
          </div>
        </div>

        {/* Step 1: Test Selection */}
        {step === 1 && (
          <div style={cardStyle}>
            <h2 style={{fontSize: '28px', fontWeight: '600', marginBottom: '10px', color: '#1e293b'}}>
              Choose Your Tests
            </h2>
            <p style={{color: '#64748b', marginBottom: '20px'}}>
              Select multiple tests from our comprehensive range of diagnostic tests
            </p>

            {/* Selected Tests Summary */}
            {selectedTests.length > 0 && (
              <div style={selectedTestsStyle}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                  <div style={{fontWeight: '600', color: '#1e293b'}}>
                    Selected Tests: {selectedTests.length} test(s)
                  </div>
                  <div style={{fontWeight: '700', color: '#10b981', fontSize: '18px'}}>
                    Total: ${calculateTotalPrice()}
                  </div>
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                  {selectedTests.map((test, index) => (
                    <div key={test.id} style={{
                      backgroundColor: '#10b981',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '15px',
                      fontSize: '14px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      {test.name}
                      <button
                        onClick={() => handleTestSelect(test)}
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
              placeholder="🔍 Search for tests (e.g., 'blood test', 'MRI', 'thyroid')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={searchBarStyle}
            />

            {/* Categories */}
            <div style={{marginBottom: '40px'}}>
              <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#475569'}}>
                Browse by Category
              </h3>
              <div style={categoriesGridStyle}>
                {testCategories.map((category) => (
                  <div
                    key={category.id}
                    style={categoryCardStyle(selectedCategory?.id === category.id)}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <div style={categoryIconStyle(category.color)}>
                      {category.icon}
                    </div>
                    <div style={{fontWeight: '600', color: '#1e293b'}}>
                      {category.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tests Grid */}
            <div>
              <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#475569'}}>
                Available Tests {selectedCategory && `- ${selectedCategory.name}`}
                <span style={{fontSize: '14px', fontWeight: '400', color: '#64748b', marginLeft: '10px'}}>
                  (Click to select/deselect)
                </span>
              </h3>
              <div style={testsGridStyle}>
                {filteredTests.map((test) => (
                  <div
                    key={test.id}
                    style={testCardStyle(selectedTests.some(t => t.id === test.id))}
                    onClick={() => handleTestSelect(test)}
                  >
                    <div style={testPriceStyle}>${test.price}</div>
                    {selectedTests.some(t => t.id === test.id) && (
                      <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        backgroundColor: '#10b981',
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
                    <div style={{fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#1e293b'}}>
                      {test.name}
                    </div>
                    <div style={{fontSize: '14px', color: '#64748b', marginBottom: '15px'}}>
                      <div style={{marginBottom: '5px'}}>📊 Category: {test.category}</div>
                      <div style={{marginBottom: '5px'}}>⏱️ Duration: {test.duration}</div>
                      <div style={{marginBottom: '5px'}}>📄 Report: {test.reportTime}</div>
                      <div>{test.fasting ? '🕒 Fasting Required' : '🍽️ No Fasting Needed'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '40px'}}>
              <div></div>
              <button
                style={buttonStyle(true)}
                onClick={() => selectedTests.length > 0 && setStep(2)}
                disabled={selectedTests.length === 0}
              >
                {selectedTests.length > 0 ? `Next: Schedule ${selectedTests.length} Test(s)` : 'Select Tests to Continue'}
                <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Scheduling Details */}
        {step === 2 && (
          <div style={cardStyle}>
            <h2 style={{fontSize: '28px', fontWeight: '600', marginBottom: '10px', color: '#1e293b'}}>
              Schedule Your Tests
            </h2>
            <p style={{color: '#64748b', marginBottom: '30px'}}>
              Provide your details and choose a convenient time
            </p>

            {/* Selected Tests Info */}
            {selectedTests.length > 0 && (
              <div style={infoBoxStyle}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                  <div>
                    <div style={{fontSize: '18px', fontWeight: '600', color: '#1e293b'}}>
                      Selected Tests ({selectedTests.length})
                    </div>
                    <div style={{color: '#10b981', fontWeight: '600'}}>
                      Total: ${calculateTotalPrice()}
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      background: 'none',
                      border: '1px solid #bbf7d0',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      color: '#10b981',
                      cursor: 'pointer',
                      fontWeight: '600',
                    }}
                  >
                    Change Tests
                  </button>
                </div>
                <div style={{marginTop: '15px'}}>
                  {selectedTests.map((test, index) => (
                    <div key={test.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px 0',
                      borderBottom: index < selectedTests.length - 1 ? '1px solid #dcfce7' : 'none',
                    }}>
                      <div>
                        <div style={{fontWeight: '600', color: '#1e293b'}}>{test.name}</div>
                        <div style={{fontSize: '14px', color: '#64748b'}}>{test.category}</div>
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <div style={{fontWeight: '600', color: '#10b981'}}>${test.price}</div>
                        <div style={{fontSize: '14px', color: '#64748b'}}>{test.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleBook}>
              <div style={formGridStyle}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Patient Type</label>
                  <select
                    name="patientType"
                    value={formData.patientType}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('patientType')}
                    onBlur={() => setFocusedField(null)}
                    style={{...selectStyle, ...(focusedField === 'patientType' && { borderColor: '#10b981', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)' })}}
                  >
                    <option value="self">Self</option>
                    <option value="family">Family Member</option>
                    <option value="child">Child</option>
                    <option value="senior">Senior Citizen</option>
                  </select>
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Test Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('date')}
                    onBlur={() => setFocusedField(null)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    style={focusedField === 'date' ? { ...inputStyle, borderColor: '#10b981', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)' } : inputStyle}
                  />
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
                    style={focusedField === 'phone' ? { ...inputStyle, borderColor: '#10b981', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)' } : inputStyle}
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="your@email.com"
                    required
                    style={focusedField === 'email' ? { ...inputStyle, borderColor: '#10b981', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)' } : inputStyle}
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

              {checkFastingRequired() && (
                <div style={formGroupStyle}>
                  <div style={checkboxContainerStyle}>
                    <input
                      type="checkbox"
                      name="fastingRequired"
                      checked={formData.fastingRequired}
                      onChange={handleInputChange}
                      style={checkboxStyle}
                    />
                    <label style={{color: '#475569', fontWeight: '500'}}>
                      I will follow fasting instructions (Some selected tests require fasting)
                    </label>
                  </div>
                </div>
              )}

              <div style={formGroupStyle}>
                <div style={checkboxContainerStyle}>
                  <input
                    type="checkbox"
                    name="doctorReferral"
                    checked={!!formData.doctorReferral}
                    onChange={(e) => setFormData(prev => ({ ...prev, doctorReferral: e.target.checked ? 'Dr. Referral' : '' }))}
                    style={checkboxStyle}
                  />
                  <label style={{color: '#475569', fontWeight: '500'}}>
                    I have a doctor's referral
                  </label>
                </div>
              </div>

              {formData.doctorReferral && (
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Referring Doctor's Name</label>
                  <input
                    type="text"
                    name="doctorReferral"
                    value={formData.doctorReferral}
                    onChange={handleInputChange}
                    placeholder="Dr. Name"
                    style={inputStyle}
                  />
                </div>
              )}

              <div style={formGroupStyle}>
                <label style={labelStyle}>Special Instructions (Optional)</label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  placeholder="Any special requirements or notes for the lab..."
                  style={{...inputStyle, minHeight: '100px'}}
                />
              </div>

              {/* Important Information */}
              <div style={{
                backgroundColor: '#fef3c7',
                padding: '20px',
                borderRadius: '12px',
                marginTop: '30px',
                border: '1px solid #fde68a',
              }}>
                <div style={{fontWeight: '600', color: '#92400e', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <span>📋</span> Important Instructions
                </div>
                <div style={{fontSize: '14px', color: '#92400e'}}>
                  {checkFastingRequired() ? 
                    '• For fasting tests: No food or drink (except water) for 8-12 hours before test\n' : 
                    '• No special fasting requirements for selected tests\n'}
                  • Bring valid ID and insurance card<br/>
                  • Arrive 15 minutes before your scheduled time<br/>
                  • Wear loose clothing for easier blood draw<br/>
                  • Stay hydrated before non-fasting tests
                </div>
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
                  disabled={loading || !formData.date || !formData.time || !formData.phone || !formData.email}
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
                      Processing Booking...
                    </>
                  ) : (
                    `Book ${selectedTests.length} Test(s)`
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
              Lab Tests Booked!
            </h2>
            
            <p style={{fontSize: '18px', color: '#64748b', marginBottom: '30px', maxWidth: '500px', margin: '0 auto'}}>
              Your tests have been scheduled successfully. Please check your email for confirmation.
            </p>

            <div style={{
              backgroundColor: '#f0fdf4',
              padding: '25px',
              borderRadius: '15px',
              marginBottom: '30px',
              maxWidth: '500px',
              margin: '0 auto',
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                <span style={{color: '#64748b'}}>Booking ID:</span>
                <span style={{fontWeight: '600', color: '#10b981'}}>{bookingId}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                <span style={{color: '#64748b'}}>Number of Tests:</span>
                <span style={{fontWeight: '600'}}>{selectedTests.length}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                <span style={{color: '#64748b'}}>Date & Time:</span>
                <span style={{fontWeight: '600'}}>{formData.date} at {formData.time}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{color: '#64748b'}}>Total Cost:</span>
                <span style={{fontSize: '20px', fontWeight: '700', color: '#10b981'}}>${calculateTotalPrice()}</span>
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
                <span>📍</span> Lab Location
              </div>
              <div style={{fontSize: '14px', color: '#1e40af'}}>
                Mercy General Hospital - Diagnostic Center<br/>
                123 Medical Plaza, Level 2<br/>
                Open: Mon-Sat 7:00 AM - 7:00 PM<br/>
                Phone: (555) 123-4567
              </div>
            </div>

            <div style={{display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <button
                style={buttonStyle(true)}
                onClick={() => {
                  setStep(1);
                  setBookingSuccess(false);
                  setSelectedTests([]);
                  setSelectedCategory(null);
                  setFormData({
                    testCategory: '',
                    specificTest: '',
                    date: '',
                    time: '',
                    patientType: 'self',
                    fastingRequired: false,
                    doctorReferral: '',
                    instructions: '',
                    phone: '',
                    email: ''
                  });
                }}
              >
                Book Another Test
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

export default LabBooking;