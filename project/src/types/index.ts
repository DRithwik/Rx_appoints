export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName?: string;
  doctorId: string;
  doctorName?: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason: string;
  notes?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  medicines: Medicine[];
  instructions: string;
  fileUrl?: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface AIMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface MedicineRecommendation {
  symptoms: string[];
  medicines: {
    name: string;
    description: string;
    dosage: string;
    warning?: string;
  }[];
  generalAdvice: string;
}