const {hash} = require("../utils/hashing")
const Otp = require('../models/otp');
const User = require('../models/user');


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
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            success:false,
            message:"user already exist"
        })
    }

    const createdUser = User.create({email});

    console.log(createdUser)
  
    
   

    return res.status(200).json({
        success:true,
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