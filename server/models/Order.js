const mongoose = require('mongoose');

const orderScheme = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    products: {
        type: [],
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Order', orderScheme);