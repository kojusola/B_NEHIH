const mongoose = require('mongoose');
const { string } = require('@hapi/joi');

const newsletterEmailSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 3,
        max: 255
    }
},{timestamps: true})

module.exports = mongoose.model('newsletterEmail', newsletterEmailSchema);