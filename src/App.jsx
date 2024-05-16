import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Confirm, FlightExplore, Booking, Payment, Flights } from "./pages";
import NotFound from "./pages/notFound";
import ProtectedRoute from "./components/protectedRoute";
import { Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import AuthNavbar from "./components/authenticated_navbar";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if the access token is available in localStorage
    const token = localStorage.getItem("access");
    setIsLoggedIn(!token); // Update isLoggedIn based on the presence of the token
  }, [])

  return (


    <Router>
      <div className="font-Nunito overflow-hidden max-w-[1440px] mx-auto">
      {isLoggedIn ? <Navbar />: <AuthNavbar /> } 
        <Routes>
            <Route path="/explore" element={<FlightExplore />} />
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/my-flights" element={<Flights />} />
          
          <Route
            element={
              <ProtectedRoute>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  
  );
}

export default App;
