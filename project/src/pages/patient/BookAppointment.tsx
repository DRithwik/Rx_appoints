import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { createAppointment } from '../../api';
import { Card, CardHeader, CardContent, CardFooter } from '../../components/Card';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import Button from '../../components/Button';

interface BookingFormData {
  doctorId: string;
  date: string;
  time: string;
  reason: string;
  notes?: string;
}

const BookAppointment: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<BookingFormData>();

  // Mock doctors list
  const doctors = [
    { value: 'doc1', label: 'Dr. Sarah Johnson (General Physician)' },
    { value: 'doc2', label: 'Dr. Michael Chang (Dentist)' },
    { value: 'doc3', label: 'Dr. Emily Wilson (Cardiologist)' },
    { value: 'doc4', label: 'Dr. David Miller (Dermatologist)' },
    { value: 'doc5', label: 'Dr. Lisa Chen (Pediatrician)' },
  ];

  // Mock available time slots
  const timeSlots = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' },
  ];

  const onSubmit = async (data: BookingFormData) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const appointmentData = {
        ...data,
        patientId: user.id,
        status: 'scheduled',
      };
      
      await createAppointment(appointmentData);
      toast.success('Appointment booked successfully');
      navigate('/patient/appointments');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get tomorrow's date for min date input
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Book an Appointment</h1>
        <p className="text-gray-600">Fill in the details below to schedule your appointment</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-blue-50">
          <h2 className="text-xl font-semibold text-blue-800 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Appointment Details
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Select Doctor</h3>
              </div>
              <Select
                label="Doctor"
                options={doctors}
                fullWidth
                {...register('doctorId', { 
                  required: 'Please select a doctor' 
                })}
                error={errors.doctorId?.message}
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Date & Time</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Date"
                  type="date"
                  min={tomorrowStr}
                  fullWidth
                  {...register('date', { 
                    required: 'Please select a date' 
                  })}
                  error={errors.date?.message}
                />
                
                <Select
                  label="Time"
                  options={timeSlots}
                  fullWidth
                  {...register('time', { 
                    required: 'Please select a time' 
                  })}
                  error={errors.time?.message}
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Reason & Notes</h3>
              </div>
              <Input
                label="Reason for Visit"
                placeholder="E.g., Annual check-up, Stomach pain, etc."
                fullWidth
                {...register('reason', { 
                  required: 'Please provide a reason for your visit' 
                })}
                error={errors.reason?.message}
              />
              
              <TextArea
                label="Additional Notes (Optional)"
                placeholder="Any additional information the doctor should know..."
                rows={4}
                fullWidth
                className="mt-4"
                {...register('notes')}
                error={errors.notes?.message}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="outlined"
                className="mr-2"
                onClick={() => navigate('/patient/dashboard')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
              >
                Book Appointment
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="bg-gray-50">
          <div className="text-sm text-gray-600">
            <p className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-2" />
              Appointments can be rescheduled or cancelled up to 24 hours before the scheduled time.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookAppointment;