import axios from 'axios';

// In a real app, this would be an env variable
const API_URL = 'https://api.rxappoint.com/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('rxappoint_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---- MOCK API FUNCTIONS ----
// In a real app, these would call the actual API endpoints

// Auth
export const registerUser = async (userData: any) => {
  // Mock implementation
  const mockResponse = {
    user: {
      id: crypto.randomUUID(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
    },
    token: 'mock-jwt-token-' + Date.now(),
  };
  
  return mockResponse;
};

export const loginUser = async (credentials: any) => {
  // Mock implementation
  const mockResponse = {
    user: {
      id: crypto.randomUUID(),
      name: 'User ' + Math.floor(Math.random() * 1000),
      email: credentials.email,
      role: credentials.email.includes('doctor') ? 'doctor' : 'patient',
    },
    token: 'mock-jwt-token-' + Date.now(),
  };
  
  return mockResponse;
};

// Appointments
export const getAppointments = async (role: string, userId: string) => {
  // Mock implementation
  const mockAppointments = Array(5).fill(null).map((_, index) => ({
    id: crypto.randomUUID(),
    patientId: role === 'doctor' ? crypto.randomUUID() : userId,
    patientName: role === 'doctor' ? `Patient ${index + 1}` : undefined,
    doctorId: role === 'patient' ? crypto.randomUUID() : userId,
    doctorName: role === 'patient' ? `Dr. Smith ${index + 1}` : undefined,
    date: new Date(Date.now() + (index * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    time: `${9 + index}:00 AM`,
    status: ['scheduled', 'completed', 'cancelled'][Math.floor(Math.random() * 3)] as 'scheduled' | 'completed' | 'cancelled',
    reason: `Appointment reason ${index + 1}`,
    notes: index % 2 === 0 ? `Additional notes for appointment ${index + 1}` : undefined,
  }));
  
  return mockAppointments;
};

export const createAppointment = async (appointmentData: any) => {
  // Mock implementation
  const mockResponse = {
    id: crypto.randomUUID(),
    ...appointmentData,
    status: 'scheduled',
  };
  
  return mockResponse;
};

// Prescriptions
export const getPrescriptions = async (userId: string, role: string) => {
  // Mock implementation
  const mockPrescriptions = Array(3).fill(null).map((_, index) => ({
    id: crypto.randomUUID(),
    patientId: role === 'doctor' ? crypto.randomUUID() : userId,
    patientName: `Patient ${index + 1}`,
    doctorId: role === 'patient' ? crypto.randomUUID() : userId,
    doctorName: `Dr. Smith ${index + 1}`,
    date: new Date(Date.now() - (index * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    medicines: [
      {
        name: `Medicine ${index * 2 + 1}`,
        dosage: '10mg',
        frequency: 'Twice daily',
        duration: '7 days',
      },
      {
        name: `Medicine ${index * 2 + 2}`,
        dosage: '5mg',
        frequency: 'After meals',
        duration: '10 days',
      },
    ],
    instructions: `Take with water. Avoid alcohol. ${index % 2 === 0 ? 'Rest well.' : 'Exercise moderately.'}`,
    fileUrl: index % 2 === 0 ? 'https://example.com/prescription.pdf' : undefined,
  }));
  
  return mockPrescriptions;
};

export const uploadPrescription = async (prescriptionData: any, file: File | null) => {
  // Mock implementation
  const mockResponse = {
    id: crypto.randomUUID(),
    ...prescriptionData,
    fileUrl: file ? 'https://example.com/prescription.pdf' : undefined,
    date: new Date().toISOString().split('T')[0],
  };
  
  return mockResponse;
};

// AI Services
export const getChatbotResponse = async (message: string) => {
  // Mock implementation
  const responses = [
    "How can I help you with your health today?",
    "I recommend drinking plenty of fluids and getting rest for those symptoms.",
    "That's a common concern. Have you discussed this with your doctor?",
    "I'm here to provide general guidance, but please consult your doctor for personalized advice.",
    "It's important to take your medication as prescribed by your doctor.",
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return {
    id: crypto.randomUUID(),
    text: randomResponse,
    sender: 'bot',
    timestamp: new Date().toISOString(),
  };
};

export const getMedicineRecommendations = async (symptoms: string[]) => {
  // Mock implementation
  const mockRecommendations = {
    symptoms,
    medicines: [
      {
        name: 'Paracetamol',
        description: 'For pain relief and fever reduction',
        dosage: '500-1000mg every 4-6 hours as needed',
        warning: 'Do not exceed 4000mg in 24 hours',
      },
      {
        name: 'Ibuprofen',
        description: 'Anti-inflammatory for pain and swelling',
        dosage: '200-400mg every 4-6 hours as needed',
        warning: 'Take with food to reduce stomach irritation',
      },
    ],
    generalAdvice: 'Ensure proper rest and hydration. If symptoms persist for more than 3 days, consult a doctor.',
  };
  
  return mockRecommendations;
};

export default api;