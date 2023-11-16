const mongoose = require('mongoose');

exports.dbConnect = ()=>{
   try{
    mongoose.connect(process.env.DB_URL)
    console.log("dbconnection successfull");
   }
   catch(error){
    console.log("error in db connection",error)
   }
}