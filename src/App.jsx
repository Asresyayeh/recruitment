import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import JobsSection from "./pages/JobsSection";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-[56px] min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <About />
                <JobsSection />
                <Footer />
              </>
            }
          />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
