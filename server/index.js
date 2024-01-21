const express = require("express");
const router = require("./routes/route")
const server = express();
const {dbConnect} = require('./config/dbConnect');
require("dotenv").config();

//cors hume  sabse phle use krna hai baaki middlewares se
const cors = require("cors");
server.use( cors({origin:"*" , credentials:true}));



server.use(express.json());
server.use("/api/v1",router);







const PORT = process.env.PORT || 5000;

server.listen(PORT , ()=>{
    console.log("server started");
})

dbConnect();


server.get("/",(req ,res)=>{
    res.send("working")
})

