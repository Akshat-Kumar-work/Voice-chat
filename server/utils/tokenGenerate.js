
const jwt = require('jsonwebtoken');
require("dotenv").config();
const accessTokenSecret = process.env.JWT_ACCESS_SECRET
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET



exports.GenerateToken = (payload)=>{

    const accessToken = jwt.sign(payload,accessTokenSecret,{
        expiresIn:'1h'
    });

    const refreshToken = jwt.sign(payload, refreshTokenSecret,{
        expiresIn:'1y'
    });
    
    return{
        accessToken , refreshToken
    }

}