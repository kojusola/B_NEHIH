const mongoose = require('mongoose');
// var mongoosePaginate = require('mongoose-paginate');

const articleModel = mongoose.Schema({
    creatorId : String,
    faceImage:{
        type: Object,
        "avatar":{
            type:String
        },
        "cloundinaryId":{
            type:String
        }
    },
    slug:{
        type: String,
        required: true,
    },
    articleName:{
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    articleContent:{
        type:String,
        required:true,
        min: 3,
    },
    articlePublishDate: {
        type: String
    },
    articleEditDate: {
        type: String
    },
    creatorName: {
        type: String
    },
    category:String,
    numberOfClaps:{
        type: Number
    },
    verified:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

// articleModel.plugin(mongoosePaginate);

module.exports = mongoose.model('article', articleModel);