const mongoose = require('mongoose');
const { string } = require('@hapi/joi');

const testimonialSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    testimonial: {
        type: String,
        required: true,
        min: 3
    },
    faceImage:{
        type: Object,
        "avatar":{
            type:String
        },
        "cloundinaryId":{
            type:String
        }
    },
},{timestamps: true})

module.exports = mongoose.model('testimonial', testimonialSchema);