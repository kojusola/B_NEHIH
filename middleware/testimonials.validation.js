const joi = require('@hapi/joi');

const testimonialsValidation = (data) => {
    const schema = joi.object({
        fullname: joi.string().min(3).required(),
        testimonial: joi.string().required(),
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
            msg:"The image extension should be either jpeg/png/jpg"
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
module.exports = { testimonialsValidation, validateImage};