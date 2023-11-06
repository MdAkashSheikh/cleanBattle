const mongoose = require('mongoose');

const customerInfoSc = new mongoose.Schema({
    zone: {
        type: String,
    },
    category: {
        type: String,
    },
    name: {
        type: String,
    },
    address: {
        type: Array,
    },
    asset: {
        type: Array,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    whatsapp: {
        type: String,
    },
    details:{
        type: String,
    },
    follows: {
        type: Array,
    },
    is_active: {
        type: String,
        default: '1',
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('customer_info_sc', customerInfoSc);