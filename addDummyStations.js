const mongoose = require('mongoose');
const Station = require('./models/station'); 

const MONGODB_URI = 'mongodb://localhost:27017/ev-charger-booking'; 

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    addDummyStations();
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

function generateRandomCoordinate(base, range) {
    return base + (Math.random() - 0.5) * range;
}

const baseLatitude = 12.9715987;  
const baseLongitude = 77.5945627; 
const coordinateRange = 0.1; 

const dummyStations = [];

for (let i = 1; i <= 20; i++) {
    const randomLatitude = generateRandomCoordinate(baseLatitude, coordinateRange);
    const randomLongitude = generateRandomCoordinate(baseLongitude, coordinateRange);

    dummyStations.push({
        name: `Station ${i}`,
        location: {
            type: 'Point',
            coordinates: [randomLongitude, randomLatitude]
        },
        slots: [
            { time: '08:00-09:00', isBooked: false },
            { time: '09:00-10:00', isBooked: false },
            { time: '10:00-11:00', isBooked: false },
            { time: '11:00-12:00', isBooked: false },
            { time: '12:00-13:00', isBooked: false },
            { time: '13:00-14:00', isBooked: false },
            { time: '14:00-15:00', isBooked: false },
            { time: '15:00-16:00', isBooked: false },
            { time: '16:00-17:00', isBooked: false },
            { time: '17:00-18:00', isBooked: false },
        ]
    });
}

async function addDummyStations() {
    try {
        await Station.insertMany(dummyStations);
        console.log('Dummy stations added successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error adding dummy stations:', error);
    }
}
