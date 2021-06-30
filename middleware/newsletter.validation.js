const joi = require('@hapi/joi');

const newsletterValidation = (data) => {
    const schema = joi.object({
        email: joi.string().min(3).required().email(),
    })
    return schema.validate(data);
}

module.exports = { newsletterValidation};