
const {generateOtp} = require("../utils/otpGenerate");
const {hash} = require("../utils/hashing")
const {mailSender} = require("../utils/mailSender");
const Otp = require('../models/otp');
const zod = require("zod");

exports.sendotp = async(req ,res)=>{
console.log("inside send otp from server")
   try{
    const emailSchema = zod.string().email();
    const { email } = req.body;
    const response = emailSchema.parse(email);
    //console.log("response string",response)
    

    // if(!response){
    //      return res.status(400).json({
    //          success:false,
    //          message:response.message
    //      })
    //  }
 
     const otp =  generateOtp();
     console.log("generated otp",otp);
          const data = otp;
    
     const hashed =  hash(data);
    
     const otpBody = {email , otp:hashed}
     //creating entry in db
     const storingOtp = await Otp.create(otpBody);
     console.log(storingOtp)

     //sending otp by mail after otp saved in db
     if(storingOtp){
        const info = await mailSender(email , otp);
        console.log(info)
     }
  
   
     return res.status(200).json({
         success:true,
         email:email,
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
