
exports.sendotp = (req ,res)=>{
    console.log("inside send otp")
    return res.status(200).json({
        success:true,
        message:"working fine"
    })
}