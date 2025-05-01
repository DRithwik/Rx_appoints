import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, FileUp, Clock, Activity, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent } from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';

const DoctorDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-bold text-gray-900">Welcome, Dr. {user?.name}</h1>
        <p className="text-gray-600">Manage your patients and appointments from your dashboard</p>
      </div>

      {/* Quick Actions */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/doctor/appointments">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center py-6">
                <Calendar className="h-10 w-10 text-blue-500 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Manage Appointments</h3>
                <p className="text-gray-600 text-center">View and manage your scheduled appointments</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/doctor/upload-prescription">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center py-6">
                <FileUp className="h-10 w-10 text-teal-500 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Upload Prescription</h3>
                <p className="text-gray-600 text-center">Create and upload prescriptions for patients</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/chatbot">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center py-6">
                <Users className="h-10 w-10 text-orange-500 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Patient Support</h3>
                <p className="text-gray-600 text-center">Access AI assistant for patient support</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Appointments */}
        <motion.div 
          className="lg:col-span-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Today's Appointments</h2>
            <Link to="/doctor/appointments">
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
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">James Wilson</h3>
                      <p className="text-gray-500 text-sm">General Check-up</p>
                      <p className="text-gray-400 text-xs mt-1">10:00 AM - 10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="primary">Upcoming</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-teal-100 rounded-full p-3 mr-4">
                      <Clock className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Emily Rodriguez</h3>
                      <p className="text-gray-500 text-sm">Follow-up Consultation</p>
                      <p className="text-gray-400 text-xs mt-1">11:15 AM - 11:45 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="primary">Upcoming</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-3 mr-4">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">David Thompson</h3>
                      <p className="text-gray-500 text-sm">Annual Physical</p>
                      <p className="text-gray-400 text-xs mt-1">2:00 PM - 3:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="primary">Upcoming</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Practice Summary */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Practice Summary</h2>
          </div>
          <Card>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-medium text-gray-900">Today's Stats</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-md p-3 text-center">
                    <p className="text-xs text-gray-600">Appointments</p>
                    <p className="text-xl font-semibold text-blue-700">5</p>
                  </div>
                  <div className="bg-green-50 rounded-md p-3 text-center">
                    <p className="text-xs text-gray-600">Completed</p>
                    <p className="text-xl font-semibold text-green-700">2</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    <h3 className="font-medium text-gray-900">Pending Tasks</h3>
                  </div>
                </div>
                <div className="text-sm space-y-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-gray-700">3 prescriptions to upload</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-gray-700">2 patient records to update</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-purple-500 mr-2" />
                    <h3 className="font-medium text-gray-900">Upcoming Week</h3>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  You have 18 appointments scheduled for the next 7 days.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;