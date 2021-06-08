const joi = require('@hapi/joi');

const newCommentsValidation = (data) => {
    const schema = joi.object({
        commentTitle: joi.string().required(),
        commentContent: joi.string().required(),
        authorName: joi.string().required(),
        authorEmail: joi.string().required(),
        publishTime: joi.string().required()
    })
    return schema.validate(data);
}

module.exports = {newCommentsValidation}