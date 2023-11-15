const crypto = require("crypto");

exports.hash = (data)=>{
    //step 1 -> sha256 algo se hash kar rhe hai with secretkey
    const shasum = crypto.createHmac('sha256',secretKey);
    //step 2 -> data json format se strig format m convert kia
    shasum.update(JSON.stringify(data));
    //step 3 -> digesting the output to hexa decimal format
    const digest = shasum.digest('hex');

    return digest;
}