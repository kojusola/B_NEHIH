require('dotenv').config();
const adminUserModel = require('../models/admin.auth.models');
const bcrypt = require('bcrypt');
const { loginValidation, registerValidation } = require('../middleware/admin.auth.validation');
const { createAccessJWT } = require('../helpers/createVerifyToken');

exports.adminLogin = async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json({
            status: false,
            msg: error.details[0].message,
            data: null,
            statusCode: 400
        });
    }

    try {
        //check if admin exists
        const admin = await adminUserModel.findOne({ email: req.body.email });
        const oopsMessage = 'Oops, Your email or password is incorrect'
        if (!admin) {
            return res.status(401).json({
                status: false,
                msg: oopsMessage,
                data: null,
                statusCode: 401
            })
        }
        //validate password
        const validatePassword = await bcrypt.compare(req.body.password, admin.password);
        if (!validatePassword) {
            return res.status(401).json({
                status: false,
                msg: oopsMessage,
                data: null,
                statusCode: 401
            })
        }
        //assign token
        console.log(admin._id)
        const accessJWT = await createAccessJWT(admin._id)
        res.status(200).json({
            status: true,
            msg: 'Admin logged in succesfully',
            data: {
                fullname: admin.fullname,
                email: admin.email,
                accessJWT
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

exports.adminRegister = async(req, res) => {
    const { error } = registerValidation(req.body);
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
        const emailExist = await adminUserModel.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).json({
                status: false,
                msg: 'This email already exists',
                statusCode: 400
            });
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //prepare data to save
        const admin = new adminUserModel({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashedPassword
        })

        //save admin
        await admin.save();
        res.json({
            status: true,
            msg: 'Admin user successfully created',
            data: {
                fullname: admin.fullname,
                email: admin.email,
            },
            statusCode: 200
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