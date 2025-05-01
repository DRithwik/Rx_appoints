import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FileText, Download, Calendar, Search, Pill } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getPrescriptions } from '../../api';
import { Prescription } from '../../types';
import { Card, CardContent } from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';

const PatientPrescriptions: React.FC = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPrescriptions = async () => {
      if (!user) return;
      
      try {
        const data = await getPrescriptions(user.id, 'patient');
        setPrescriptions(data);
        setFilteredPrescriptions(data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
        toast.error('Failed to load prescriptions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrescriptions();
  }, [user]);

  useEffect(() => {
    if (searchTerm) {
      const results = prescriptions.filter(
        prescription => 
          prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prescription.medicines.some(med => 
            med.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredPrescriptions(results);
    } else {
      setFilteredPrescriptions(prescriptions);
    }
  }, [searchTerm, prescriptions]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Prescriptions</h1>
        <p className="text-gray-600">View and download your prescriptions</p>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by doctor or medicine..."
            className="pl-10"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredPrescriptions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
          <p className="text-gray-600">
            {searchTerm 
              ? "No prescriptions match your search criteria" 
              : "You don't have any prescriptions yet"}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPrescriptions.map((prescription) => (
            <Card key={prescription.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="md:flex md:justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <FileText className="h-6 w-6 text-blue-500 mr-2" />
                      <h3 className="text-xl font-semibold text-gray-900">
                        Prescription from {prescription.doctorName}
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-500 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{prescription.date}</span>
                    </div>
                  </div>
                  
                  {prescription.fileUrl && (
                    <div className="mt-4 md:mt-0">
                      <Button 
                        variant="outlined" 
                        className="flex items-center"
                        onClick={() => window.open(prescription.fileUrl, '_blank')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Medicines</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {prescription.medicines.map((medicine, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                        <div className="flex items-center mb-2">
                          <Pill className="h-4 w-4 text-teal-500 mr-2" />
                          <h5 className="font-medium text-gray-900">{medicine.name}</h5>
                        </div>
                        <div className="ml-6 text-sm text-gray-600 space-y-1">
                          <p><strong>Dosage:</strong> {medicine.dosage}</p>
                          <p><strong>Frequency:</strong> {medicine.frequency}</p>
                          <p><strong>Duration:</strong> {medicine.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Instructions</h4>
                  <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 text-gray-800">
                    {prescription.instructions}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientPrescriptions;