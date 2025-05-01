import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FilePlus, Plus, Trash2, Upload } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { uploadPrescription } from '../../api';
import { Card, CardHeader, CardContent, CardFooter } from '../../components/Card';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import Button from '../../components/Button';

interface PrescriptionFormData {
  patientId: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  instructions: string;
}

const UploadPrescription: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const { 
    register, 
    control,
    handleSubmit, 
    formState: { errors } 
  } = useForm<PrescriptionFormData>({
    defaultValues: {
      medicines: [{ name: '', dosage: '', frequency: '', duration: '' }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicines"
  });

  // Mock patients list
  const patients = [
    { value: 'pat1', label: 'James Wilson' },
    { value: 'pat2', label: 'Emily Rodriguez' },
    { value: 'pat3', label: 'David Thompson' },
    { value: 'pat4', label: 'Sarah Parker' },
    { value: 'pat5', label: 'Michael Brown' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: PrescriptionFormData) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const prescriptionData = {
        ...data,
        doctorId: user.id,
        doctorName: user.name,
        patientName: patients.find(p => p.value === data.patientId)?.label || '',
      };
      
      await uploadPrescription(prescriptionData, file);
      toast.success('Prescription uploaded successfully');
      navigate('/doctor/appointments');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload prescription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Upload Prescription</h1>
        <p className="text-gray-600">Create and upload a prescription for your patient</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-teal-50">
          <h2 className="text-xl font-semibold text-teal-800 flex items-center">
            <FilePlus className="h-5 w-5 mr-2" />
            Prescription Details
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <Select
                label="Patient"
                options={patients}
                fullWidth
                {...register('patientId', { 
                  required: 'Please select a patient' 
                })}
                error={errors.patientId?.message}
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-900">Medicines</h3>
                <Button 
                  type="button" 
                  variant="outlined"
                  className="text-xs px-2 py-1 flex items-center"
                  onClick={() => append({ name: '', dosage: '', frequency: '', duration: '' })}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Medicine
                </Button>
              </div>
              
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 mb-4 border border-gray-200 rounded-md bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-800">Medicine {index + 1}</h4>
                    {fields.length > 1 && (
                      <Button 
                        type="button" 
                        variant="danger"
                        className="text-xs px-2 py-1 flex items-center"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Medicine Name"
                      fullWidth
                      {...register(`medicines.${index}.name`, { 
                        required: 'Medicine name is required' 
                      })}
                      error={errors.medicines?.[index]?.name?.message}
                    />
                    
                    <Input
                      label="Dosage"
                      placeholder="e.g., 10mg, 5ml"
                      fullWidth
                      {...register(`medicines.${index}.dosage`, { 
                        required: 'Dosage is required' 
                      })}
                      error={errors.medicines?.[index]?.dosage?.message}
                    />
                    
                    <Input
                      label="Frequency"
                      placeholder="e.g., Twice daily, After meals"
                      fullWidth
                      {...register(`medicines.${index}.frequency`, { 
                        required: 'Frequency is required' 
                      })}
                      error={errors.medicines?.[index]?.frequency?.message}
                    />
                    
                    <Input
                      label="Duration"
                      placeholder="e.g., 7 days, 2 weeks"
                      fullWidth
                      {...register(`medicines.${index}.duration`, { 
                        required: 'Duration is required' 
                      })}
                      error={errors.medicines?.[index]?.duration?.message}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <TextArea
                label="Instructions"
                placeholder="Special instructions for the patient..."
                rows={4}
                fullWidth
                {...register('instructions', { 
                  required: 'Instructions are required' 
                })}
                error={errors.instructions?.message}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Upload Prescription (Optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a file</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
              {file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected file: {file.name}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="outlined"
                className="mr-2"
                onClick={() => navigate('/doctor/appointments')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
              >
                Upload Prescription
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="bg-gray-50">
          <div className="text-sm text-gray-600">
            <p>All prescriptions are digitally signed and stored securely.</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UploadPrescription;