import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Confirm, FlightExplore, PassengerInfo, Payment } from "./pages";
import NotFound from "./pages/notFound";
import ProtectedRoute from "./components/protectedRoute";
import { Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import Sign from "./pages/Sign";

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
            <Route path="/explore" element={<FlightExplore />} />
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <Route path="/confirm" element={<Confirm />} />
                <Route path="/passenger-info" element={<PassengerInfo />} />
                <Route path="/payment" element={<Payment />} />
              </ProtectedRoute>
            }
          />
          <Route path="/sign" element={<Sign />} />
          {/* <Route path="*" element={<NotFound />} /> */}
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
