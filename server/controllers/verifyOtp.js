const {hash} = require("../utils/hashing")
const Otp = require('../models/otp');
const User = require('../models/user');
const tokenService = require('../utils/tokenGenerate');

exports.verifyOtp = async (req, res)=>{

    try{
      
    const {otp , email} = req.body;
   

    if(!otp || !email){
        return res.status(400).json({
            success:false,
            message:"all fields are required"
        })
    }

    const hashedOtp = hash(parseInt(otp));
 
    const findOtp = await Otp.findOne({otp:hashedOtp})

    if(!findOtp){
        return res.status(400).json({
            success:false,
            message:"wrong otp"
        })
    }

    //after otp verification user will be created 
    let user = await User.findOne({email});

    if(!user){
        //creating user if not exist 
     user = await User.create({email});

    }
  
    const payload = {
        _id: user._id,
        activated:false
    }
    
    //Tokens
    const {accessToken , refreshToken } = tokenService.GenerateToken(payload);

  res.cookie('refreshtoken', refreshToken ,{
    expiresIn:new Date(Date.now()+3*24*60*60*1000),
    httpOnly: true
   }).status(200).json({
    success:true,
    accessToken: accessToken,
    user : user,
    message: "otp verification done and user created"
})

    
 
    }
    catch(errr){
        console.log("error while verifying otp",errr);
        return res.status(400).json({
            success:false,
            message:"unable to verify otp"
        })
    }
}