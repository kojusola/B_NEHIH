const joi = require('@hapi/joi');

const contactUsValidation = (data) => {
    const schema = joi.object({
        email: joi.string().min(3).required().email(),
        fullname: joi.string().min(3).required(),
        phone: joi.number().min(3).required(),
        message: joi.string().required(),
    })
    return schema.validate(data);
}

module.exports = { contactUsValidation};