import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import JobsSection from "./pages/JobsSection";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import JobsPage from "./pages/JobsPage";
import PostJob from "./pages/PostJob";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CompanyForm from "./pages/CompanyForm";
import CompanyVerifyPage from "./pages/CompanyVerifyPage";
import Dashboard from "./pages/Dashboard";
import EditCompany from "./pages/EditCompany";
import RecruiterJobsPage from "./pages/RecruiterJobsPage";
import EditJob from "./pages/EditJob";
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
                <Contact />
                <Footer />
              </>
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/post" element={<PostJob />} />
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/create-company" element={<CompanyForm />} />
          <Route path="/company/verify" element={<CompanyVerifyPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-company" element={<EditCompany />} />
          <Route path="/recruiter-jobs" element={<RecruiterJobsPage />} />
          <Route path="/jobs/edit/:id" element={<EditJob />} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
