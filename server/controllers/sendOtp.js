
const {generateOtp} = require("../utils/otpGenerate");
const {hash} = require("../utils/hashing")
const {mailSender} = require("../utils/mailSender");
const Otp = require('../models/otp');

exports.sendotp = async(req ,res)=>{

   try{
    const { email } = req.body;
    if(!email){
         return res.status(400).json({
             success:false,
             message:"data not found"
         })
     }
 
     const otp =  generateOtp();

     const data = `${email}.${otp}`;
    
     const hashed =  hash(data);
    
     const otpBody = {email , otp:hashed}
     //creating entry in db
     const storingOtp = await Otp.create(otpBody);
     console.log(storingOtp)

     //sending otp by mail
     const info = await mailSender(email , otp);
     console.log(info)
   
     return res.status(200).json({
         success:true,
         message:"otp sent successfully",
     })
   }
   catch(err){
    console.log("error while sending otp",err);
    return res.status(400).json({
        success:false,
        message:"unable to send otp"
    })
   }

}
