import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Pill, AlertTriangle, ArrowRight, Stethoscope, CheckCircle, X } from 'lucide-react';
import { getMedicineRecommendations } from '../../api';
import { MedicineRecommendation } from '../../types';
import { Card, CardHeader, CardContent } from '../../components/Card';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import Badge from '../../components/Badge';
import { motion } from 'framer-motion';

const commonSymptoms = [
  'Fever', 'Headache', 'Cough', 'Sore Throat', 'Runny Nose',
  'Body Ache', 'Nausea', 'Dizziness', 'Fatigue', 'Chills',
  'Rash', 'Stomach Pain', 'Diarrhea', 'Joint Pain', 'Back Pain'
];

const MedicineAI: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomsText, setSymptomsText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<MedicineRecommendation | null>(null);

  const handleSymptomToggle = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleAddCustomSymptom = () => {
    if (symptomsText.trim()) {
      const newSymptom = symptomsText.trim();
      if (!selectedSymptoms.includes(newSymptom)) {
        setSelectedSymptoms([...selectedSymptoms, newSymptom]);
      }
      setSymptomsText('');
    }
  };

  const handleGetRecommendations = async () => {
    if (selectedSymptoms.length === 0) {
      toast.error('Please select at least one symptom');
      return;
    }

    setIsLoading(true);
    try {
      const data = await getMedicineRecommendations(selectedSymptoms);
      setRecommendations(data);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast.error('Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setSymptomsText('');
    setRecommendations(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Medicine Recommendations</h1>
        <p className="text-gray-600">Get AI-powered medicine suggestions based on your symptoms</p>
      </div>

      {!recommendations ? (
        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-teal-50 py-4">
            <div className="flex items-center">
              <div className="bg-teal-100 rounded-full p-2 mr-3">
                <Stethoscope className="h-6 w-6 text-teal-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Select Your Symptoms</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <p className="text-gray-700 mb-4">Please select all the symptoms you're experiencing:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {commonSymptoms.map((symptom) => (
                  <div
                    key={symptom}
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`rounded-full px-3 py-1 text-sm cursor-pointer transition-colors ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {symptom}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add a custom symptom (if not listed above)
              </label>
              <div className="flex">
                <TextArea
                  placeholder="Describe your symptom..."
                  className="flex-1 rounded-r-none"
                  rows={1}
                  value={symptomsText}
                  onChange={(e) => setSymptomsText(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={handleAddCustomSymptom}
                  disabled={!symptomsText.trim()}
                  variant="primary"
                  className="rounded-l-none"
                >
                  Add
                </Button>
              </div>
            </div>

            {selectedSymptoms.length > 0 && (
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-900 mb-2">Selected Symptoms:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map((symptom) => (
                    <Badge key={symptom} variant="primary" className="flex items-center">
                      {symptom}
                      <button 
                        onClick={() => handleSymptomToggle(symptom)}
                        className="ml-1 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-8">
              <div className="text-sm text-gray-600 flex items-center">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                This is an AI tool and should not replace professional medical advice.
              </div>
              <Button
                type="button"
                onClick={handleGetRecommendations}
                disabled={isLoading || selectedSymptoms.length === 0}
                variant="primary"
                isLoading={isLoading}
                icon={!isLoading ? <ArrowRight className="h-4 w-4" /> : undefined}
              >
                Get Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg mb-8">
            <CardHeader className="bg-teal-50 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-teal-100 rounded-full p-2 mr-3">
                    <Pill className="h-6 w-6 text-teal-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Medicine Recommendations</h2>
                </div>
                <Button
                  type="button"
                  onClick={handleReset}
                  variant="outlined"
                  className="text-sm"
                >
                  New Search
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Based on your symptoms:</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {recommendations.symptoms.map((symptom, index) => (
                    <Badge key={index} variant="primary">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Medicines:</h3>
                <div className="space-y-4">
                  {recommendations.medicines.map((medicine, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex items-start">
                        <div className="bg-teal-100 rounded-full p-2 mr-3 mt-1">
                          <Pill className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <h4 className="text-md font-semibold text-gray-900">{medicine.name}</h4>
                          <p className="text-gray-700 mt-1">{medicine.description}</p>
                          <div className="mt-2">
                            <p className="text-sm text-gray-600"><strong>Suggested Dosage:</strong> {medicine.dosage}</p>
                            {medicine.warning && (
                              <p className="text-sm text-red-600 mt-1 flex items-center">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                <strong>Warning:</strong> {medicine.warning}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-md font-semibold text-gray-900">Important Disclaimer</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      These recommendations are provided by an AI system and should not replace professional medical advice. 
                      Always consult with a healthcare provider before taking any medication.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-md font-semibold text-gray-900">General Advice</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      {recommendations.generalAdvice}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default MedicineAI;