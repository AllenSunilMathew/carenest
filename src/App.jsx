import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import HomePage from './components/Homepage.jsx'
import Header from './common/Header.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import About from './components/About.jsx'
import AdminPage from './components/AdminPage.jsx'
import Contact from './components/Contact.jsx'
import Services from './components/Services.jsx'
import UserPage from './components/UserPage.jsx'
import AppointmentBooking from './components/AppoinmentBooking.jsx'
import LabBooking from './components/LabBooking.jsx'
import Facilities from './common/Facility.jsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  // Check authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedRole = localStorage.getItem('role')
    const storedName = localStorage.getItem('userName')
    
    if (token) {
      setIsAuthenticated(true)
      setUserRole(storedRole)
      setUserName(storedName)
    }
    
    // Redirect to login if not authenticated
    if (!token && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
      navigate('/login')
    }
  }, [navigate])

  const handleLogin = (token, role, name) => {
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    localStorage.setItem('userName', name)
    setIsAuthenticated(true)
    setUserRole(role)
    setUserName(name)
    
    if (role === 'admin') {
      navigate('/adminpage')
    } else {
      navigate('/user')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userName')
    setIsAuthenticated(false)
    setUserRole(null)
    setUserName('')
    navigate('/login')
  }

  return (
    <>
      <Header 
        isAuthenticated={isAuthenticated}
        userName={userName}
        userRole={userRole}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/facilty" element={<Facilities />} />
        
        {/* Protected Routes */}
        <Route 
          path="/adminpage" 
          element={
            isAuthenticated && userRole === 'admin' ? 
            <AdminPage /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/user" 
          element={
            isAuthenticated && userRole === 'patient' ? 
            <UserPage /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/appoinmentbook" 
          element={
            isAuthenticated ? 
            <AppointmentBooking /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/labbook" 
          element={
            isAuthenticated ? 
            <LabBooking /> : 
            <Navigate to="/login" />
          } 
        />
        
        {/* Redirect to login for any other route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App