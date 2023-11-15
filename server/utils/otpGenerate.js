const crypto = require("crypto");

exports.generateOtp = async ()=>{
    console.log("inside otp")
    return crypto.randomInt(1000, 9999);
}
