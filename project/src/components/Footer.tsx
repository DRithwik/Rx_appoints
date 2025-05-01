import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Calendar, FileText } from 'lucide-react';

const Footer = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-blue-400" />
              RxAppoint
            </h3>
            <p className="text-gray-300">
              Your trusted healthcare companion for appointments, prescriptions, and medical assistance.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition flex items-center">
                  <span className="mr-2">•</span> Home
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to={user?.role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard'} className="text-gray-300 hover:text-blue-400 transition flex items-center">
                      <span className="mr-2">•</span> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/chatbot" className="text-gray-300 hover:text-blue-400 transition flex items-center">
                      <span className="mr-2">•</span> AI Assistant
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="text-gray-300 hover:text-blue-400 transition flex items-center">
                      <span className="mr-2">•</span> Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-gray-300 hover:text-blue-400 transition flex items-center">
                      <span className="mr-2">•</span> Register
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/about" className="text-gray-300 hover:text-blue-400 transition flex items-center">
                  <span className="mr-2">•</span> About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                Appointment Scheduling
              </li>
              <li className="flex items-center text-gray-300">
                <FileText className="h-4 w-4 mr-2 text-blue-400" />
                Prescription Management
              </li>
              <li className="flex items-center text-gray-300">
                <MessageSquare className="h-4 w-4 mr-2 text-blue-400" />
                AI Health Assistant
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} RxAppoint. All rights reserved.
          </p>
          <p className="flex items-center text-gray-400 mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for better healthcare
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;