require('dotenv').config();
const joinNehihModel = require('../models/join.nehih.models');
const {joinNehihValidation} = require('../middleware/joinNehih.validtion')

exports.nehihApplications = async(req, res) => {
    const { error } = joinNehihValidation(req.body);
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
        const emailExist = await joinNehihModel.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).json({
                status: false,
                msg: 'This email already exists',
                statusCode: 400
            });
        };

        //prepare data to save
        const joinNehih = new joinNehihModel({
            email: req.body.email,
            phone: req.body.phone,
            fullname: req.body.fullname,
            reason: req.body.reason,
            review: false
        })

        //save admin
        await joinNehih.save();
       return res.json({
            status: true,
            msg: 'Application sent',
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
exports.getAllNehihApplications = async(req, res) => {
    try{
        const Emails = await joinNehihModel.find();
            if(Emails){
               return res.status(200).json({
                    status: true,
                    msg: 'Applications request Successful',
                    data: {
                        Emails
                    },
                    statusCode: 200
                })
            }else{
               return res.status(400).json({
                    status: false,
                    msg: 'there are no applications',
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

exports.getOneApplication= async(req, res) => {

    try {
        //get application from database
        const application = await joinNehihModel.findOne({ "_id": req.query.applicationId });
        const oopsMessage = 'Oops, Your application does not exists'
        if (!application) {
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
            msg: 'Application request successful',
            data: {
                application: application
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