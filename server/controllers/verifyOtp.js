const {hash} = require("../utils/hashing")
const Otp = require('../models/otp');
const User = require('../models/user');
const tokenService = require('../utils/tokenGenerate');
const Token = require('../models/refresh');


exports.verifyOtp = async (req, res)=>{

    console.log("inside verify otp from server controller")
    try{
      
    const {otp , email} = req.body;
   console.log("otp,email",otp,email)
   

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

    //storing refresh token in db

    //first find is there previous token available for this id
    const findTokenAvailability = await Token.findOne({userId:user._id});

    if(findTokenAvailability){
        console.log("inside find token availablity")
        const UpdatingRefreshToken = await Token.findOneAndUpdate({userId:user._id},{token:refreshToken});
        if(!UpdatingRefreshToken){
         res.status(500).json({
             success:false,
             message:"unable to update refresh token inside verify otp controller of updating token"
         })
        }
         res.cookie('accessToken',accessToken,
                    { expiresIn:new Date(Date.now()+3*24*60*60*1000) , httpOnly:true ,sameSite:'None',secure:true });


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

    //if token phle se available nai h data base m toh y kro
    else{

        console.log("inside token not available generate new token else")
            const StoringRefreshToken = await Token.create({token:refreshToken, userId:user._id});
                console.log(StoringRefreshToken)
                
            res.cookie('accessToken',accessToken,
            { expiresIn:new Date(Date.now()+3*24*60*60*1000) , httpOnly:true ,sameSite:'None',secure:true });


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
 
    }
    catch(errr){
        console.log("error while verifying otp",errr);
        return res.status(400).json({
            success:false,
            message:"unable to verify otp"
        })
    }
}