const joi = require('@hapi/joi');

const newArticleValidation = (data) => {
    const schema = joi.object({
        creatorId: joi.string(),
        articleName: joi.string().required(),
        articleContent: joi.string().required(),
        articlePublishDate: joi.string().required(),
        articleEditDate: joi.string().required(),
        category: joi.string().required(),
        numberOfClaps: joi.number(),
        verified: joi.boolean()
    })
    return schema.validate(data);
}
const validateImage = (file) =>{
    console.log((file.image.mimetype !== 'image/jpeg'))
    if(JSON.stringify(file) === 'null'){
        return {
            bol: true,
            msg:"image required"
        }
    }else if((file.image.mimetype === 'image/jpeg') && (file.image.mimetype === 'image/png') && (file.image.mimetype === 'image/jpg')){
        return {
            bol: true,
            msg:"The image extension should either be jpeg/png/jpg"
        }
    } else if (file.image.size > 10*1024*1024){
        return {
            bol: true,
            msg:"image is not of the right size"
        }
    }
    return {
        bol:false
    }
}

module.exports = {newArticleValidation,validateImage}