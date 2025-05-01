const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');
const { auth, isDoctor } = require('../middleware/auth');

// Create a new prescription (doctors only)
router.post('/', auth, isDoctor, async (req, res) => {
  try {
    const {
      patientId,
      appointmentId,
      medicines,
      diagnosis,
      notes,
      validUntil
    } = req.body;

    const prescription = new Prescription({
      patient: patientId,
      doctor: req.user._id,
      appointment: appointmentId,
      medicines,
      diagnosis,
      notes,
      validUntil
    });

    await prescription.save();
    
    await prescription.populate('doctor', 'name email specialization');
    await prescription.populate('patient', 'name email');
    await prescription.populate('appointment');

    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Error creating prescription', error: error.message });
  }
});

// Get patient's prescriptions
router.get('/my-prescriptions', auth, async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patient: req.user._id })
      .populate('doctor', 'name email specialization')
      .populate('patient', 'name email')
      .populate('appointment')
      .sort({ createdAt: -1 });

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescriptions', error: error.message });
  }
});

// Get prescriptions by patient ID (for doctors)
router.get('/patient/:patientId', auth, isDoctor, async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patient: req.params.patientId })
      .populate('doctor', 'name email specialization')
      .populate('patient', 'name email')
      .populate('appointment')
      .sort({ createdAt: -1 });

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescriptions', error: error.message });
  }
});

// Get doctor's issued prescriptions
router.get('/doctor-prescriptions', auth, isDoctor, async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ doctor: req.user._id })
      .populate('patient', 'name email')
      .populate('doctor', 'name email specialization')
      .populate('appointment')
      .sort({ createdAt: -1 });

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescriptions', error: error.message });
  }
});

// Update prescription (doctors only)
router.put('/:id', auth, isDoctor, async (req, res) => {
  try {
    const prescription = await Prescription.findOne({
      _id: req.params.id,
      doctor: req.user._id
    });

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    const {
      medicines,
      diagnosis,
      notes,
      validUntil
    } = req.body;

    if (medicines) prescription.medicines = medicines;
    if (diagnosis) prescription.diagnosis = diagnosis;
    if (notes) prescription.notes = notes;
    if (validUntil) prescription.validUntil = validUntil;

    await prescription.save();
    
    await prescription.populate('doctor', 'name email specialization');
    await prescription.populate('patient', 'name email');
    await prescription.populate('appointment');

    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Error updating prescription', error: error.message });
  }
});

// Get a specific prescription by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('doctor', 'name email specialization')
      .populate('patient', 'name email')
      .populate('appointment');

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    // Check if user is authorized to view this prescription
    if (
      prescription.patient._id.toString() !== req.user._id.toString() &&
      prescription.doctor._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescription', error: error.message });
  }
});

module.exports = router; 