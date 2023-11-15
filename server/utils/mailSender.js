
const nodemailer = require("nodemailer");

exports.mailSender = async(email , otp)=>{

    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })

    let stringOtp = otp.toString();

    try{
        let info = await transporter.sendMail({
            from: "Voice Chat",
            to: email , 
            subject: "OTP VERIFICATION",
            html: stringOtp
        })

        console.log(info)

    }

    catch(error){
        console.log("error inside mail sender",error);
    }

 



}