require('dotenv').config()
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: 'eventstrolleys@gmail.com',
        pass: process.env.EMAIL_PASS
    }
})

const send = (info)=>{
    return new Promise( async(resolve, reject)=>{
        try{
            let result = await  transporter.sendMail(info);
    
            console.log("Message sent: %s", result.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            resolve(result)
        }catch(error){
            console.log(error)
        }
    })

}

const emailProcessor = ({email, fullname, message, phone })=>{
    console.log(1)
    console.log(`${fullname} ${email} ${message} ${phone}`);
        var info = {
            from: `${fullname} ${email}`, // sender address
            to: 'adeola5678@gmail.com', // list of receivers
            subject: "Contact Email", // Subject line
            text: `Hello,full name:${fullname},email: ${email},message:${message}, phone: ${phone}`, // plain text body
            html: `<p><b>Hello,</b><p>
            full name:${fullname}
            <p>email: ${email}</p>
            <p>phone: ${phone}</p>
            <p>message: ${message}</p>`, // html body
            }
            send(info);
}

module.exports = {emailProcessor}