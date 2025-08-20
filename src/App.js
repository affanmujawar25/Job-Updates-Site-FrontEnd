import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Corrected component imports
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Corrected page imports
import Home from './components/pages/Home';
import Jobs from './components/pages/Jobs';
import JobDetail from './components/pages/JobDetail';
import About from './components/pages/About';
import Contact from './components/pages/Contact';

// Corrected admin page imports
import AdminLogin from './components/pages/admin/AdminLogin';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import JobListAdmin from './components/pages/admin/JobListAdmin';
import JobForm from './components/pages/admin/JobForm';
import ContactQueries from './components/pages/admin/ContactQueries';

// Context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/jobs" element={<JobListAdmin />} />
            <Route path="/admin/jobs/new" element={<JobForm />} />
            <Route path="/admin/jobs/edit/:id" element={<JobForm />} />
            <Route path="/admin/contact-queries" element={<ContactQueries />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;