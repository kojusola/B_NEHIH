require('dotenv').config();
const { contactUsValidation }= require('../middleware/contactUs.validation');
const {emailProcessor} = require('../helpers/email')

exports.contactUs = async(req, res) => {
    const { error } = contactUsValidation(req.body);
    if (error) {
        return res.status(400).json({
            status: false,
            msg: error.details[0].message,
            data: null,
            statusCode: 400
        });
    }

    try {
        const fullname = await req.body.fullname
        console.log(fullname)
        const email = await  req.body.email
        const phone =await  req.body.phone
        const message = await req.body.message
       const sentEmail = await emailProcessor({
           email,
           fullname,
           phone,
           message
       })
       return res.json({
            status: true,
            msg: 'Message successfully sent',
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