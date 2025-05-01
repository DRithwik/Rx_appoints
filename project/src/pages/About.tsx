import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Shield, 
  Users, 
  Clock, 
  MessageSquare,
  Calendar,
  CheckCircle
} from 'lucide-react';
import Button from '../components/Button';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About RxAppoint</h1>
          <p className="text-xl max-w-3xl mx-auto text-blue-100">
            We're on a mission to make healthcare more accessible, efficient, and user-friendly for everyone.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At RxAppoint, we believe that healthcare should be easily accessible to everyone. Our platform connects patients with healthcare providers seamlessly, reducing wait times and improving the overall healthcare experience.
              </p>
              <p className="text-lg text-gray-600">
                We leverage technology to simplify the appointment booking process, prescription management, and provide AI-powered assistance to address common health concerns.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg flex flex-col items-center text-center">
                <Heart className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Patient Care</h3>
                <p className="text-gray-600">We prioritize patient experience and care in everything we do.</p>
              </div>
              <div className="bg-teal-50 p-6 rounded-lg flex flex-col items-center text-center">
                <Shield className="h-10 w-10 text-teal-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Data Security</h3>
                <p className="text-gray-600">Your medical data is securely stored and protected.</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg flex flex-col items-center text-center">
                <Users className="h-10 w-10 text-orange-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Accessibility</h3>
                <p className="text-gray-600">Making healthcare accessible to everyone, everywhere.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg flex flex-col items-center text-center">
                <Clock className="h-10 w-10 text-purple-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Efficiency</h3>
                <p className="text-gray-600">Saving time for both patients and healthcare providers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              RxAppoint offers a comprehensive suite of features designed to improve healthcare delivery and patient experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Calendar className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Appointment Management</h3>
              <p className="text-gray-600">
                Book, reschedule, or cancel appointments with healthcare providers. Get reminders and notifications.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <MessageSquare className="h-10 w-10 text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">AI Health Assistant</h3>
              <p className="text-gray-600">
                Get instant answers to common health questions with our AI-powered chatbot available 24/7.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <CheckCircle className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Medicine Recommendations</h3>
              <p className="text-gray-600">
                Receive AI-generated medicine suggestions based on your symptoms and medical history.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Shield className="h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Secure Prescription Access</h3>
              <p className="text-gray-600">
                Doctors can upload and patients can securely access their prescriptions digitally.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Users className="h-10 w-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Doctor Profiles</h3>
              <p className="text-gray-600">
                View doctor profiles with specializations, experience, and availability before booking.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Clock className="h-10 w-10 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Real-time Updates</h3>
              <p className="text-gray-600">
                Get real-time updates about appointment status, prescription uploads, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join RxAppoint Today</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
            Experience a better way to manage your healthcare needs. Register now and get started in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button 
                variant="secondary" 
                className="text-base px-8 py-3"
              >
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outlined" 
                className="text-base px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              >
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;