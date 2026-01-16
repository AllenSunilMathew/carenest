import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  const contactStyle = {
    padding: '100px 20px',
    backgroundColor: '#fff',
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
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
  
  const sectionSubtitleStyle = {
    fontSize: '18px',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  };
  
  const contactGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '60px',
  };
  
  const contactInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  };
  
  const contactCardStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    transition: 'all 0.3s ease',
  };
  
  const contactIconStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '15px',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: 'white',
    flexShrink: '0',
  };
  
  const contactTextStyle = {
    flex: '1',
  };
  
  const contactTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '5px',
    color: '#333',
  };
  
  const contactDetailStyle = {
    fontSize: '16px',
    color: '#666',
  };
  
  const formStyle = {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
  };
  
  const formGroupStyle = {
    marginBottom: '25px',
  };
  
  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#333',
  };
  
  const inputStyle = {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: '2px solid #e1e5e9',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    backgroundColor: '#f8fafc',
  };
  
  const textareaStyle = {
    ...inputStyle,
    minHeight: '150px',
    resize: 'vertical',
    fontFamily: 'inherit',
  };
  
  const focusedInputStyle = {
    ...inputStyle,
    borderColor: '#6a11cb',
    boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.1)',
    outline: 'none',
  };
  
  const buttonStyle = {
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    color: 'white',
    border: 'none',
    padding: '18px 40px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const successMessageStyle = {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: '600',
  };
  
  const [focusedField, setFocusedField] = useState(null);
  
  const contactInfoData = [
    {
      id: 1,
      icon: '📍',
      title: 'Visit Our Office',
      details: ['123 Innovation Drive', 'San Francisco, CA 94107']
    },
    {
      id: 2,
      icon: '📞',
      title: 'Call Us',
      details: ['+1 (555) 123-4567', 'Mon-Fri: 9AM-6PM PST']
    },
    {
      id: 3,
      icon: '✉️',
      title: 'Email Us',
      details: ['hello@Carenest.com', 'support@Carenest.com']
    }
  ];
  
  return (
    <section id="contact" style={contactStyle}>
      <div style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>Get In Touch</h2>
          <p style={sectionSubtitleStyle}>
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>
        </div>
        
        <div style={contactGridStyle}>
          <div style={contactInfoStyle}>
            {contactInfoData.map((item) => (
              <div key={item.id} style={contactCardStyle}>
                <div style={contactIconStyle}>
                  {item.icon}
                </div>
                <div style={contactTextStyle}>
                  <h3 style={contactTitleStyle}>{item.title}</h3>
                  {item.details.map((detail, index) => (
                    <p key={index} style={contactDetailStyle}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}
            
            <div style={{
              ...contactCardStyle,
              background: 'linear-gradient(to right, #6a11cb, #2575fc)',
              color: 'white',
            }}>
              <div style={{...contactIconStyle, backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                ⚡
              </div>
              <div>
                <h3 style={{...contactTitleStyle, color: 'white'}}>Quick Response</h3>
                <p style={{...contactDetailStyle, color: 'rgba(255, 255, 255, 0.9)'}}>
                  We typically respond within 2 business hours
                </p>
              </div>
            </div>
          </div>
          
          <div style={formStyle}>
            {submitted && (
              <div style={successMessageStyle}>
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John Doe"
                  required
                  style={focusedField === 'name' ? focusedInputStyle : inputStyle}
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
                  placeholder="john@example.com"
                  required
                  style={focusedField === 'email' ? focusedInputStyle : inputStyle}
                />
              </div>
              
              <div style={formGroupStyle}>
                <label style={labelStyle}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Project Inquiry"
                  required
                  style={focusedField === 'subject' ? focusedInputStyle : inputStyle}
                />
              </div>
              
              <div style={formGroupStyle}>
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell us about your project..."
                  required
                  style={focusedField === 'message' ? {...focusedInputStyle, minHeight: '150px'} : textareaStyle}
                />
              </div>
              
              <button
                type="submit"
                style={buttonStyle}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg style={{width: '20px', height: '20px', marginRight: '10px'}} viewBox="0 0 50 50">
                      <circle style={{fill: 'none', stroke: 'white', strokeWidth: '4', strokeLinecap: 'round', cx: '25', cy: '25', r: '20'}}></circle>
                    </svg>
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;