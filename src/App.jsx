import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home, Confirm, FlightExplore, Booking, Payment, Flights } from "./pages";
import NotFound from "./pages/notFound";
import ProtectedRoute from "./components/protectedRoute";
import "./App.css";
import Navbar from "./components/navbar";
import AuthNavbar from "./components/authenticated_navbar";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsLoggedIn(!!token); // Update isLoggedIn based on the presence of the token
  }, []);

  return (
    <Router>
      <div className="font-Nunito overflow-hidden max-w-[1440px] mx-auto">
        {isLoggedIn ? <AuthNavbar /> : <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<FlightExplore />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />

          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirm"
            element={
              <ProtectedRoute>
                <Confirm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-flights"
            element={
              <ProtectedRoute>
                <Flights />
              </ProtectedRoute>
            }
         
          ></Route>
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
