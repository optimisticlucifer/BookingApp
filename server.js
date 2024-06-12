const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
