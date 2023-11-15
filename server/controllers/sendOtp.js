
const {generateOtp} = require("../utils/otpGenerate");

exports.sendotp = async(req ,res)=>{

    const { phoneNumber , name} = req.body;
    if(!phoneNumber){
        return res.status(400).json({
            success:false,
            message:"data not found"
        })
    }

    const otp = await generateOtp();
    console.log(otp)
    return res.status(200).json({
        success:true,
        message:"otp sent successfully",
        otp:otp
    })
}