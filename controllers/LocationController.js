const { Location } = require('../models');

module.exports = {
  async getAll(req, res, next) {
    try {
      const locations = await Location.findAll();
      res.json({ success: true, data: locations });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { name, address, lat, lng, color } = req.body;
      const location = await Location.create({ name, address, lat, lng, color });
      res.status(201).json({ success: true, data: location });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, address, lat, lng, color } = req.body;
      const location = await Location.findByPk(id);
      if (!location) return res.status(404).json({ success: false, message: 'Location not found' });
      Object.assign(location, { name, address, lat, lng, color });
      await location.save();
      res.json({ success: true, data: location });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const location = await Location.findByPk(id);
      if (!location) return res.status(404).json({ success: false, message: 'Location not found' });
      await location.destroy();
      res.json({ success: true, message: 'Location deleted' });
    } catch (error) {
      next(error);
    }
  },
};