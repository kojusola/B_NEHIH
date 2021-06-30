const {newCommentsValidation} = require('../middleware/comments.article.validation')
const commentsModel = require('../models/comments.articles.models');
const cloudinary = require("../helpers/cloudinary");


exports.createComment= async(req, res) => {
    const { error } = newCommentsValidation(req.body);
   if (error) {
       return res.status(400).json({
           status: false,
           msg: error.details[0].message,
           data: null,
           statusCode: 400
       });
   };
   try{
       const comment = new commentsModel({
            articleId: req.query.articleId,
            commentTitle: req.body.commentTitle,
            commentContent: req.body.commentContent,
            authorName: req.body.articlePublishDate,
            authorEmail: req.body.authorEmail,
            publishTime: req.body.articleEditDate
       });
       await comment.save();
       console.log(comment)
       if(comment){
           res.status(200).json({
               status: true,
               msg: 'Comment successfully saved',
               data: {
               comment
           },
               statusCode: 200
           })
       }else{
       res.status(400).json({
           status: false,
           msg: 'Comment not saved',
           statusCode: 400
       })
   }
   } catch (error) {
       res.status(500).send({
           status: false,
           msg: 'Internal Server Error',
           data: null,
           statusCode: 500
       });
   }
};


exports.deleteComment = async(req, res) => {
    try{
        const comment = await commentsModel.findOneAndDelete({"_id":req.query.commentId});
        if(comment){
            res.status(200).json({
                status: true,
                msg: 'Comment successfully deleted.',
                data: {
                    comment 
                },
                statusCode: 200
            });
        }else{
            res.status(400).json({
                status: false,
                msg: 'Comment does not exist.',
                statusCode: 400
            })
        }
    }catch(error){
        res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
            statusCode: 500
        });
    }
}