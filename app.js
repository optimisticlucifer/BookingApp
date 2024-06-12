const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(bodyParser.json());
app.use(cors());


const userRoutes = require('./routes/users');
const stationRoutes = require('./routes/stations');
const bookingRoutes = require('./routes/bookings');

app.use('/users', userRoutes);
app.use('/stations', stationRoutes);
app.use('/bookings', bookingRoutes);


app.use(express.static('views'));

module.exports = app;
