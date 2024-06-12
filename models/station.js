const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    name: String,
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number]
    },
    slots: [{ time: String, isBooked: Boolean }]
});

stationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Station', stationSchema);
