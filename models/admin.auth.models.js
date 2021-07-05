const mongoose = require('mongoose');
const { string } = require('@hapi/joi');

const adminUserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    role:{
        type: String,
        required: true,
        min: 3,
        default: 'admin'
    },
    authorized:{
        type: String,
        required:true
    }
},{timestamps: true})

module.exports = mongoose.model('adminUser', adminUserSchema);