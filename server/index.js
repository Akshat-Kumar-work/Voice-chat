const express = require("express");
const router = require("./routes/route")
const server = express();
const {dbConnect} = require('./config/dbConnect');
require("dotenv").config();

server.use(express.json());
server.use("/api/v1",router);

const cors = require('cors');
server.use(cors({origin:"http://localhost:3000",credentials:true}));


const PORT = process.env.PORT || 3000;

server.listen(PORT , ()=>{
    console.log("server started");
})

dbConnect();


server.get("/",(req ,res)=>{
    res.send("working")
})

