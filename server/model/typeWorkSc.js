const mongoose = require('mongoose');

const typeWorkSc = new mongoose.Schema({
    name: {
        type: String,
    },
    basePrice: {
        type: Number,
    },
    details: {
        type: String,
    },
    is_active: {
        type: String,
        default: "1",
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('type_work', typeWorkSc);