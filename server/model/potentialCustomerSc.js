const mongoose = require('mongoose');

const potentilCustomerSc = new mongoose.Schema({
    name: {
        type: String,
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

module.exports = mongoose.model('potential_customer', potentilCustomerSc);