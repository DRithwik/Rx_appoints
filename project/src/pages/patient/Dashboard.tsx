import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageSquare, Stethoscope, FileText, BookOpen, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent } from '../../components/Card';
import Button from '../../components/Button';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Manage your healthcare journey from your dashboard</p>
      </div>

      {/* Quick Actions */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/patient/book">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center py-6">
                <Calendar className="h-10 w-10 text-blue-500 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Book Appointment</h3>
                <p className="text-gray-600 text-center">Schedule a new appointment with a doctor</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/chatbot">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center py-6">
                <MessageSquare className="h-10 w-10 text-teal-500 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">AI Health Assistant</h3>
                <p className="text-gray-600 text-center">Chat with our AI for health advice</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/patient/medicine-ai">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center py-6">
                <Stethoscope className="h-10 w-10 text-orange-500 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Medicine AI</h3>
                <p className="text-gray-600 text-center">Get medicine recommendations</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments */}
        <motion.div 
          className="lg:col-span-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
            <Link to="/patient/appointments">
              <Button variant="outlined" className="text-sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            <motion.div variants={item}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Dr. Sarah Johnson</h3>
                      <p className="text-gray-500 text-sm">General Check-up</p>
                      <p className="text-gray-400 text-xs mt-1">Tomorrow, 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outlined" className="text-xs px-3 py-1">
                      Reschedule
                    </Button>
                    <Button variant="danger" className="text-xs px-3 py-1">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-teal-100 rounded-full p-3 mr-4">
                      <Calendar className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Dr. Michael Chang</h3>
                      <p className="text-gray-500 text-sm">Dental Check-up</p>
                      <p className="text-gray-400 text-xs mt-1">Apr 15, 2:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outlined" className="text-xs px-3 py-1">
                      Reschedule
                    </Button>
                    <Button variant="danger" className="text-xs px-3 py-1">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Health Summary */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Health Summary</h2>
          </div>
          <Card>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-medium text-gray-900">Recent Activity</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-gray-700">Last appointment: Mar 12, 2025</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 rounded-full bg-teal-500 mr-2"></div>
                    <span className="text-gray-700">Last prescription: Mar 12, 2025</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-green-500 mr-2" />
                    <h3 className="font-medium text-gray-900">Prescriptions</h3>
                  </div>
                  <Link to="/patient/prescriptions" className="text-blue-500 text-sm">View all</Link>
                </div>
                <div className="text-sm text-gray-700">
                  You have 3 active prescriptions
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-orange-500 mr-2" />
                    <h3 className="font-medium text-gray-900">Health Tips</h3>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  Stay hydrated! Drink at least 8 glasses of water daily for optimal health.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;