const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number]
    }
});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);
