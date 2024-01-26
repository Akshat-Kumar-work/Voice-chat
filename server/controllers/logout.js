const RefreshToken  = require('../models/refresh');


exports.logout = async(req,res)=>{

    try{
        const {refreshtoken} = req.cookies;
        if(!refreshtoken){
            return res.status(404).json({
                success:false,
                mess:'refresh token is not present in cookie'
            })
        }

    await RefreshToken.deleteOne({token:refreshtoken})

    //delete cookies
    res.clearCookie('refreshtoken');
    res.clearCookie('accessToken')
    res.json({
        user:null,
        auth:false
    })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            mess:"unable to logout "
        })

    }
}