import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import NotFound from './pages/notFound'
import ProtectedRoute from './components/protectedRoute'
import { Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import Footer from './components/footer'


function Logout() {
 localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {

  return (
    <Router>
        <div className="font-Nunito overflow-hidden max-w-[1440px] mx-auto">
        <Navbar />
      <Routes>
        <Route path="/" element= 
        {<ProtectedRoute>
          
          <Home />
        
        </ProtectedRoute>} />

        <Route path="/logout" element={<Logout />} />  

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      </div>
    </Router>
  )
}

export default App
