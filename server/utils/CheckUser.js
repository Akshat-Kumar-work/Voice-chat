const User = require('../models/user');

exports.CheckUser = async (email)=>{
try{
    const checking = await User.findOne(email);
    if(checking){
        return true;
    }
    if(!checking){
        return false;
    }
}
catch(err){
    console.log("error while checking user",err);

}
}