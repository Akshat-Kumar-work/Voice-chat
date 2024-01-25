require("dotenv").config();
const jwt = require('jsonwebtoken')

exports.checkAuthentication = async(req,res,next)=>{
    console.log("cookies",req.cookies)
    try{
        const accessToken = req.cookies.accessToken;

        if(!accessToken){
            return res.status(401).json({
                success:false,
                message:"access denied token is missing",
            })
        }
        
        try{
        const checkCookie = jwt.verify(accessToken,process.env.JWT_ACCESS_SECRET);
      
        if(!checkCookie){
            throw new Error();
        }

        req.body.user = checkCookie;
            
        }
        catch(err){
            console.log(err);
            return res.status(400).json({
                success:false,
                message:"err while verifying token"
            })
        }
        next();
        
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Internal server errr",
        })
        
    }

}