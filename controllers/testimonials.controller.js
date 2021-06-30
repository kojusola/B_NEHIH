const testimonialModel = require('../models/textimonials.models');
const {testimonialsValidation, validateImage} = require('../middleware/testimonials.validation')
const cloudinary = require("../helpers/cloudinary");


exports.createtestimonial = async(req, res) => {
    const { error } = testimonialsValidation(req.body);
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
       const result = await cloudinary.uploader.upload(req.files.image.tempFilePath); 
       const testimonial = new testimonialModel({
           faceImage:
            {
               avatar:result.secure_url,
               cloundinaryId: result.public_id
           },
           fullname: req.body.fullname,
           testimonial: req.body.testimonial,
       });
       await testimonial.save();
       if(testimonial){
           res.status(200).json({
               status: true,
               msg: 'testimonial successfully saved',
               data: {
               testimonial
           },
               statusCode: 200
           })
       }else{
       res.status(400).json({
           status: false,
           msg: 'testimonial not saved',
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
}

exports.getAlltestimonials = async(req, res) => {
    try{
        const Emails = await testimonialModel.find();
            if(Emails){
               return res.status(200).json({
                    status: true,
                    msg: 'Testimonial request Successful',
                    data: {
                        Emails
                    },
                    statusCode: 200
                })
            }else{
               return res.status(400).json({
                    status: false,
                    msg: 'there are no testimonials',
                    statusCode: 400
                })
            } 
        }catch(error){
            console.log(error);
           return res.status(500).send({
                status: false,
                msg: 'Internal Server Error',
                data: null,
                statusCode: 500
            });
        }
};

exports.deleteTestimonial = async(req, res) => {
    try{
        const testimonial = await testimonialModel.findOneAndDelete({"_id":req.query.testimonialId});
        if(testimonial){
            res.status(200).json({
                status: true,
                msg: 'testimonial successfully deleted.',
                data: {
                    testimonial 
                },
                statusCode: 200
            });
        }else{
            res.status(400).json({
                status: false,
                msg: 'testimonial does not exist.',
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