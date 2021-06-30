const joi = require('@hapi/joi');

const joinNehihValidation = (data) => {
    const schema = joi.object({
        email: joi.string().min(3).required().email(),
        fullname: joi.string().min(3).required(),
        phone: joi.number().min(3).required(),
        reason: joi.string().required(),
    })
    return schema.validate(data);
}

module.exports = { joinNehihValidation};