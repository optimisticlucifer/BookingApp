const express = require('express');
const router = express.Router();
const Station = require('../models/station'); 


router.get('/', async (req, res) => {
    const { longitude, latitude } = req.query;
    try {
        const stations = await Station.find({
            location: {
                $near: {
                    $geometry: { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] },
                    $maxDistance: 50000
                }
            }
        });
        // console.log(stations)
        res.send(stations);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


module.exports = router;
