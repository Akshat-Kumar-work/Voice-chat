require("dotenv").config();
const jwt = require('jsonwebtoken');
const Token = require("../models/refresh");
const User = require("../models/user");
const tokenService = require("../utils/tokenGenerate");

exports.checkAuthentication = async(req,res,next)=>{

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


exports.refreshAuthentication = async(req,res,next)=>{
    try{
          //get refresh token from cookie
        //   console.log("refresh token",req.cookies.refreshtoken);
        //   console.log("access token",req.cookies.accessToken);

    const refreshTokenFromCookie = req.cookies.refreshtoken;

    if(!refreshTokenFromCookie){
        return res.status(401).json({
            message:"refresh token is missing",
            success:false
        })
    }

    //check if token is valid
     
    const tokenValidity =  jwt.verify(refreshTokenFromCookie,process.env.JWT_REFRESH_SECRET);

    if(!tokenValidity){
        throw new Error("invalid token");
    }
    

    //check if token is present in db
    const TokenDb = await Token.findOne({userId:tokenValidity._id , token:refreshTokenFromCookie});

    if(!TokenDb){
        return res.status(500).json({
            message:"token not found in db",
            success:'false'
        })
    }

    //check if user is valid or not
    const user = await User.findOne({_id:tokenValidity._id});
    if(!user){
        return res.status(404).json({
            message:"not valid user -> user not found in db",
            success:"false"
        })
    }

    //generate new tokens for both refresh and access token
    const {accessToken , refreshToken } = tokenService.GenerateToken({ _id: user._id});


    //put token in cookies

    //accesstoken in cookie
    res.cookie('accessToken',accessToken,
    { expiresIn:new Date(Date.now()+3*24*60*60*1000) , httpOnly:true ,sameSite:'None',secure:true });

    //put refresh token in db
    //update refresh token in db
   const UpdatingRefreshToken = await Token.findOneAndUpdate({userId:user._id},{token:refreshToken});
   if(!UpdatingRefreshToken){
    res.status(500).json({
        success:false,
        message:"unable to update refresh token"
    })
   }
  
  //refresh token in cookie
    res.cookie('refreshtoken', refreshToken ,{
      expiresIn:new Date(Date.now()+3*24*60*60*1000),
      httpOnly: true,
      sameSite:'None',
      secure: true
     }).status(200).json({
      success:true,
      user : user,
      auth:true,
      message: "otp verification done and user created"
  })

    }
    
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:'unable to refresh token'
        })

    }
  

}