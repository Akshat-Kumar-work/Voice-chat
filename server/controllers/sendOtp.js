
const {generateOtp} = require("../utils/otpGenerate");
const {hash} = require("../utils/hashing")
const {mailSender} = require("../utils/mailSender")

exports.sendotp = async(req ,res)=>{

    const { email } = req.body;
   if(!email){
        return res.status(400).json({
            success:false,
            message:"data not found"
        })
    }

    const otp =  generateOtp();
    // const ttl = 1000*60*2; //2 minutes
    // const expires = Date.now()+ttl;
    // const data = `${email}.${otp}.${expires}`;
    // const hashed =  hash(data);
    const info = await mailSender(email , otp);
    console.log(info)
  
    return res.status(200).json({
        success:true,
        message:"otp sent successfully",
    })

}
