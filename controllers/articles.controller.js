const articleModel = require('../models/articles.models');
const {newArticleValidation,validateImage} = require('../middleware/article.validation')
const commentsModel = require('../models/comments.articles.models');
const cloudinary = require("../helpers/cloudinary");
const slugify = require("slugify");

exports.getOneArticle = async(req, res) => {

    try {
        //get article from database
        const article = await articleModel.findOne({ "_id": req.query.articleId });
        const comments = await commentsModel.find({ "articleId": req.query.articleId });
        const oopsMessage = 'Oops, Your article does not exists'
        if (!article) {
            return res.status(401).json({
                status: false,
                msg: oopsMessage,
                data: null,
                statusCode: 401
            })
        }
        res.status(200).json({
            status: true,
            statusCode: 200,
            msg: 'Article request successful',
            data: {
                article: article,
                comments: comments,
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
            statusCode: 500
        });
    }
}

exports.getAllArticle = async(req, res) => {

try{
    const articles = await articleModel.find();
        if(articles){
            res.status(200).json({
                status: true,
                msg: 'Articles request successful.',
                data: {
                    articles
                },
                statusCode: 200
            })
        }else{
            res.status(400).json({
                status: false,
                msg: 'there are no articles',
                statusCode: 400
            })
        } 
    }catch(error){
        console.log(error);
        res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
            statusCode: 500
        });
    }
}

exports.createArticle = async(req, res) => {
    console.log(req.body);
     const { error } = newArticleValidation(req.body);
    if (error) {
        return res.status(400).json({
            status: false,
            msg: error.details[0].message,
            data: null,
            statusCode: 400
        });
    };
    const  message =  await validateImage(req.files);
    if (message.bol){
        return res.status(400).json({
            status: false,
            msg: message.msg,
            data: null,
            statusCode: 400
        });
    };
    try{
        const slug = await slugify(req.body.articleName);
        console.log(slug)
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath); 
        console.log(result);
        const article = new articleModel({
            creatorId: req.userId,
            articleName: req.body.articleName,
            articleContent: req.body.articleContent,
            articlePublishDate: req.body.articlePublishDate,
            articleEditDate: req.body.articleEditDate,
            numberOfClaps: 0,
            faceImage:
             {
                avatar:result.secure_url,
                cloundinaryId: result.public_id
            },
            category:req.body.category,
            verified: false,
            slug: slug
        });
        console.log(article)
        await article.save();
        if(article){
            res.status(200).json({
                status: true,
                msg: 'Article successfully created',
                data: {
                article
            },
                statusCode: 200
            })
        }else{
        res.status(400).json({
            status: false,
            msg: 'Article not created',
            statusCode: 400
        })
    }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
            statusCode: 500
        });
    }
}


exports.updateArticle = async(req, res) => {
    try{
        const update = req.body
        console.log(update);
        const article = await articleModel.findOneAndUpdate({"_id":req.query.articleId},update,{new:true});
         console.log(article);
        if(article){
            res.status(200).json({
                status: true,
                msg: 'Article update saved.',
                data: {
                    article
                },
                statusCode: 200
            })
        }else{
            res.status(400).json({
                status: false,
                msg: 'Article not updated.',
                statusCode: 400
            })
        }
    }catch(error){
        console.log(error);
        res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
            statusCode: 500
        });
    }
}

exports.updateArticleImage = async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);
        // console.log(result);
        const updateArticle = await articleModel.findByIdAndUpdate({"_id": req.query.articleId}, {faceImage: {avatar:result.secure_url,cloundinaryId: result.public_id}}, {new: true});
        if(!updateArticle){
           return res.status(400).json({
                status: false,
                msg: 'Article image not updated.',
                statusCode: 400
            });
        }
        return res.status(200).json({
            status: true,
            msg: 'Article image updated.',
            data: {
                updateArticle 
            },
            statusCode: 200
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
            statusCode: 500
        });
    }
}

exports.deleteArticle = async(req, res) => {
    try{
        const article = await articleModel.findOneAndDelete({"_id":req.query.articleId});
        if(article){
            res.status(200).json({
                status: true,
                msg: 'Article successfully deleted.',
                data: {
                    article 
                },
                statusCode: 200
            });
        }else{
            res.status(400).json({
                status: false,
                msg: 'Article does not exist.',
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

exports.publishArticle = async(req, res) => {
    try{ 
        const publishTicketStatus = await articleModel.findOne({"_id":req.query.articleId});
        console.log(publishTicketStatus.verified)
        if(publishTicketStatus.verified){
            const article = await articleModel.findOneAndUpdate({"_id":req.query.articleId}
            ,{"$set":{"verified":false}},{new:true});
            console.log(article);
            if(article){
                res.status(200).json({
                    status: true,
                    msg: 'Article unpublished',
                    data: {
                        article
                    },
                    statusCode: 200
                })
            }else{
                res.status(400).json({
                    status: false,
                    msg: 'Article not unpublished',
                    statusCode: 400
                })
            }
        }else{
            const article = await articleModel.findOneAndUpdate({"_id":req.query.articleId}
            ,{"$set":{"verified":true,"articlePublishDate": new Date()}},{new:true});
            console.log(article);
            if(article){
                res.status(200).json({
                    status: true,
                    msg: 'Article published',
                    data: {
                        article
                    },
                    statusCode: 200
                })
            }else{
                res.status(400).json({
                    status: false,
                    msg: 'Article not published',
                    statusCode: 400
                })
            }
        }
    }catch(error){ 
        // console.log(error);
        res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
            statusCode: 500
        });
    }
}
