const Service = require('../models/Service');

// @desc    Get all active services (public)
// @route   GET /api/services
const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all services including inactive (admin)
// @route   GET /api/services/all
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new service (protected)
// @route   POST /api/services
const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a service (protected)
// @route   PUT /api/services/:id
const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a service (protected)
// @route   DELETE /api/services/:id
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getServices, getAllServices, createService, updateService, deleteService };
