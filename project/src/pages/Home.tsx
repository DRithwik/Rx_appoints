import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MessageSquare, 
  FileText, 
  Users, 
  ArrowRight, 
  CheckCircle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Healthcare Made Simple
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Book appointments, chat with our AI assistant, and manage your prescriptions all in one place.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {isAuthenticated ? (
                <Link to={user?.role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard'}>
                  <Button 
                    variant="secondary" 
                    className="text-base px-6 py-3"
                    icon={<ArrowRight className="h-5 w-5" />}
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button 
                      variant="secondary" 
                      className="text-base px-6 py-3"
                    >
                      Register Now
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button 
                      variant="outlined" 
                      className="text-base px-6 py-3 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                    >
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </div>
        
        {/* Curved Bottom */}
        <svg className="absolute bottom-0 w-full h-8 md:h-16 text-white" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 48H1440V0C1440 0 1144 48 720 48C296 48 0 0 0 0V48Z" fill="currentColor" />
        </svg>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose RxAppoint?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform provides a seamless experience for both patients and healthcare providers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="rounded-full bg-blue-100 p-3 inline-flex mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Appointment Booking</h3>
              <p className="text-gray-600">
                Schedule appointments with doctors in just a few clicks. Choose your preferred time and date.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="rounded-full bg-teal-100 p-3 inline-flex mb-4">
                <MessageSquare className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Health Assistant</h3>
              <p className="text-gray-600">
                Get quick answers to your health questions with our AI-powered chatbot available 24/7.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="rounded-full bg-orange-100 p-3 inline-flex mb-4">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital Prescriptions</h3>
              <p className="text-gray-600">
                Access your prescriptions online. Doctors can upload and patients can view their medical prescriptions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Patients & Doctors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-blue-500 mr-3" />
                <h3 className="text-2xl font-bold">For Patients</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Easy appointment booking with preferred doctors</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Access to AI chatbot for quick health guidance</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>View and download prescriptions digitally</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Get AI-powered medicine recommendations</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/register">
                  <Button 
                    variant="primary" 
                    className="w-full"
                  >
                    Register as Patient
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-teal-500 mr-3" />
                <h3 className="text-2xl font-bold">For Doctors</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Manage your appointment schedule efficiently</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Upload prescriptions for your patients</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>View patient history and details</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Easy communication with your patients</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/register">
                  <Button 
                    variant="secondary" 
                    className="w-full"
                  >
                    Register as Doctor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
            Join thousands of patients and doctors who are already using RxAppoint to make healthcare more accessible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button 
                variant="secondary" 
                className="text-base px-8 py-3"
              >
                Create an Account
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="outlined" 
                className="text-base px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;