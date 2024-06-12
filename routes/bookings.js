const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Station = require('../models/station');


router.post('/', async (req, res) => {
    try {
        let stationId = req.body.station;
        let slotTime = req.body.slot;

        console.log(stationId, slotTime)

        const station = await Station.findById(stationId);
        console.log(station)
        if (!station) {
            console.log('Station not found');
            return res.status(404).send('Station not found');
        }

        const slotIndex = station.slots.findIndex(slot => slot.time === slotTime);
        if (slotIndex === -1 || station.slots[slotIndex].isBooked) {
            return res.status(400).send('Slot not available');
        }
        const slotId = station.slots[slotIndex]._id;

        const [startTime, endTime] = slotTime.split('-');

        const paymentPending = 2 *( parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0]));
        console.log(paymentPending,)


        const booking = new Booking({
            station: stationId,
            slot: slotId, 
            startTime: startTime,
            endTime: endTime,
            paymentPending: paymentPending
        });
        await booking.save();

 
        station.slots[slotIndex].isBooked = true;
        await station.save();

        res.status(201).send(booking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/allbookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).send(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/:id/end', async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    booking.paymentPending = true;
    await booking.save();
    res.send(booking);
});

module.exports = router;
