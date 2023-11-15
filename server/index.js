const express = require("express");



const server = express();

require("dotenv").config();



server.listen("3000" , ()=>{
    console.log("server started");
})

