const {ImageUploaderToCloudinary} = require('../utils/imageUploader');
const User = require('../models/user');

exports.activateUser = async (req,res)=>{
try{
    const {name , user} = req.body;

    const avatar = req.files.avatar


    // if(!name || !avatar){
    //     return res.status(400).json({
    //         success:false,
    //         mess: "data in not completed"
    //     })}

        const uploadImg = await ImageUploaderToCloudinary(avatar , process.env.FOLDER_NAME , 1000,1000);

        //getting user id from the req which we got from payload and put it into req while verifying the token in auth middlewares
        const userId = user._id;

        const userResponse = await User.findByIdAndUpdate(userId , {
         activated :true,
         userName : name,
          avatar : uploadImg.secure_url
    
        });

        const latestUser = await User.findOne({_id:userId})
        if(!userResponse){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }


        res.json({
            success:true,
            message:"user activated",
            UpdatedUser: latestUser
        })
    
}
catch(err){
console.log(err)
return res.status(500).json({
    success:false,
    mess:"error while activating user",
})
}

}