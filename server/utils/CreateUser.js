const User = require('../models/user');


exports.CreateUser = async (email)=>{
    try{

       const user = await User.create({email});
       return user
        
    }
    catch(err){
        console.log("error while creating user",err);

    }
}