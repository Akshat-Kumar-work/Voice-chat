const {hash} = require("../utils/hashing")
const Otp = require('../models/otp');


exports.verifyOtp = async (req, res)=>{

    try{
        
    const {otp} = req.body;

    const hashedOtp = hash(parseInt(otp));
 
    const findOtp = await Otp.findOne({otp:hashedOtp})

    if(!findOtp){
        return res.status(400).json({
            success:false,
            message:"wrong otp"
        })
    }

    //after otp verification user will be created 
    
   

    return res.status(200).json({
        success:true
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