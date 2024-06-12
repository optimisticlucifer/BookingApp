const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot' }, 
    startTime: String,
    endTime: String,
    paymentPending: Number 
});

module.exports = mongoose.model('Booking', bookingSchema);
