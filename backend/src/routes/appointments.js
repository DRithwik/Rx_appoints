const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { auth, isDoctor } = require('../middleware/auth');

// Book a new appointment
router.post('/', auth, async (req, res) => {
  try {
    const { doctorId, date, symptoms } = req.body;

    const appointment = new Appointment({
      patient: req.user._id,
      doctor: doctorId,
      date,
      symptoms
    });

    await appointment.save();
    
    await appointment.populate('doctor', 'name email');
    await appointment.populate('patient', 'name email');

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error: error.message });
  }
});

// Get patient's appointments
router.get('/my-appointments', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate('doctor', 'name email specialization')
      .populate('patient', 'name email')
      .sort({ date: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
});

// Get doctor's appointments
router.get('/doctor-appointments', auth, isDoctor, async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user._id })
      .populate('patient', 'name email phone')
      .populate('doctor', 'name email specialization')
      .sort({ date: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
});

// Update appointment status
router.put('/:id', auth, isDoctor, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      doctor: req.user._id
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status;
    if (notes) appointment.notes = notes;

    await appointment.save();
    
    await appointment.populate('doctor', 'name email');
    await appointment.populate('patient', 'name email');

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error: error.message });
  }
});

// Get all doctors' appointments (for admin)
router.get('/all', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'doctor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const appointments = await Appointment.find({})
      .populate('doctor', 'name email specialization')
      .populate('patient', 'name email')
      .sort({ date: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
});

// Cancel appointment (patient only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patient: req.user._id,
      status: 'pending'
    });

    if (!appointment) {
      return res.status(404).json({ 
        message: 'Appointment not found or cannot be cancelled'
      });
    }

    await appointment.deleteOne();
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling appointment', error: error.message });
  }
});

module.exports = router; 