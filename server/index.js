const express = require("express");
const router = require("./routes/route")
const server = express();
require("dotenv").config();



server.use(express.json());
server.use(router);


const PORT = process.env.PORT || 3000;

server.listen(PORT , ()=>{
    console.log("server started");
})
