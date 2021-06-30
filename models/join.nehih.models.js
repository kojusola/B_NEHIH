const mongoose = require('mongoose');
const { string } = require('@hapi/joi');

const joinNehihSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    reason: {
        type: String,
        required: true,
        min: 3
    },
    review:{
        type: Boolean,
        required: true,
        default: false,
    }
},{timestamps: true})

module.exports = mongoose.model('joinNehih', joinNehihSchema);