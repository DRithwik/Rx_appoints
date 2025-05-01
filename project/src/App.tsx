import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PatientDashboard from './pages/patient/Dashboard';
import DoctorDashboard from './pages/doctor/Dashboard';
import BookAppointment from './pages/patient/BookAppointment';
import PatientAppointments from './pages/patient/Appointments';
import DoctorAppointments from './pages/doctor/Appointments';
import UploadPrescription from './pages/doctor/UploadPrescription';
import PatientPrescriptions from './pages/patient/Prescriptions';
import Chatbot from './pages/Chatbot';
import MedicineAI from './pages/patient/MedicineAI';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              
              {/* Patient Routes */}
              <Route path="/patient/dashboard" element={
                <PrivateRoute role="patient">
                  <PatientDashboard />
                </PrivateRoute>
              } />
              <Route path="/patient/book" element={
                <PrivateRoute role="patient">
                  <BookAppointment />
                </PrivateRoute>
              } />
              <Route path="/patient/appointments" element={
                <PrivateRoute role="patient">
                  <PatientAppointments />
                </PrivateRoute>
              } />
              <Route path="/patient/prescriptions" element={
                <PrivateRoute role="patient">
                  <PatientPrescriptions />
                </PrivateRoute>
              } />
              <Route path="/patient/medicine-ai" element={
                <PrivateRoute role="patient">
                  <MedicineAI />
                </PrivateRoute>
              } />
              
              {/* Doctor Routes */}
              <Route path="/doctor/dashboard" element={
                <PrivateRoute role="doctor">
                  <DoctorDashboard />
                </PrivateRoute>
              } />
              <Route path="/doctor/appointments" element={
                <PrivateRoute role="doctor">
                  <DoctorAppointments />
                </PrivateRoute>
              } />
              <Route path="/doctor/upload-prescription" element={
                <PrivateRoute role="doctor">
                  <UploadPrescription />
                </PrivateRoute>
              } />
              
              {/* Common Routes */}
              <Route path="/chatbot" element={
                <PrivateRoute>
                  <Chatbot />
                </PrivateRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
