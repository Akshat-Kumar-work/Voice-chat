const express = require("express");
const router = require("./routes/route")
const server = express();
const {dbConnect} = require('./config/dbConnect');
require("dotenv").config();
const cloudinary = require('./config/cloudinary');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')

dbConnect();


server.use(express.json());
server.use(cookie())
server.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

//cors hume  sabse phle use krna hai baaki middlewares se
const cors = require("cors");
server.use( cors({origin:'http://localhost:3000' , credentials:true }));

server.use(bodyParser.json({ limit: '10mb' }));
server.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));



//cloudinary connection
cloudinary.clodudinaryConnect();
console.log("cloudinary connected")


server.use("/api/v1",router);



const PORT = process.env.PORT || 5000;

server.listen(PORT , ()=>{
    console.log("server started on",PORT);
})



server.get("/",(req ,res)=>{
    res.send("working")
})

