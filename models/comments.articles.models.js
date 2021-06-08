const mongoose = require('mongoose');
// var mongoosePaginate = require('mongoose-paginate');

const commentsModel = mongoose.Schema({
    articleId : String,
    commentTitle:{
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    commentContent:{
        type:String,
        required:true,
        min: 3,
    },
    authorName: {
        type: String
    },
    authorEmail: {
        type: String
    },
    publishTime: {
        type: String
    }
},{timestamps: true});

module.exports = mongoose.model('comments', commentsModel);