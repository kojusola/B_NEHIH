require('dotenv').config();
const newsletterModel = require('../models/newsletter.emails.models');
const {newsletterValidation} = require('../middleware/newsletter.validation')

exports.emailRegister = async(req, res) => {
    const { error } = newsletterValidation(req.body);
    if (error) {
        return res.status(400).json({
            status: false,
            msg: error.details[0].message,
            data: null,
            statusCode: 400
        });
    }

    try {
        // check if email exists
        const emailExist = await newsletterModel.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).json({
                status: false,
                msg: 'This email already exists',
                statusCode: 400
            });
        };

        //prepare data to save
        const userEmail = new newsletterModel({
            email: req.body.email
        })

        //save admin
        await userEmail.save();
       return res.json({
            status: true,
            msg: 'Email successfully added',
            data: {
                email: userEmail.email,
            },
            statusCode: 200
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
            statusCode: 500
        });
    }
}
exports.getAllNewsletterMail = async(req, res) => {
    try{
        const Emails = await newsletterModel.find();
            if(Emails){
               return res.status(200).json({
                    status: true,
                    msg: 'Emails request successful.',
                    data: {
                        Emails
                    },
                    statusCode: 200
                })
            }else{
               return res.status(400).json({
                    status: false,
                    msg: 'there are no emails',
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
}

exports.emailToCsv = async(req, res) => {
    try{
        const Emails = await newsletterModel.find();
            if(Emails){
                return res.status(200).json({
                    status: true,
                    msg: 'Emails request successful.',
                    data: {
                        Emails
                    },
                    statusCode: 200
                })
            }else{
               return  res.status(400).json({
                    status: false,
                    msg: 'there are no emails',
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
}