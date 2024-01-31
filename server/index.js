const express = require("express");
const router = require("./routes/route")
const App = express();
const {dbConnect} = require('./config/dbConnect');
require("dotenv").config();
const cloudinary = require('./config/cloudinary');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

//creating server with http instance for sockets
const server = require('http').createServer(App);

const io = require("socket.io")(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
});

dbConnect();


App.use(express.json());
App.use(cookie())
App.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

//cors hume  sabse phle use krna hai baaki middlewares se
const cors = require("cors");
const ACTIONS = require("./actions");
App.use( cors({origin:'http://localhost:3000' , credentials:true }));

App.use(bodyParser.json({ limit: '10mb' }));
App.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));



//cloudinary connection
cloudinary.clodudinaryConnect();
console.log("cloudinary connected")


App.use("/api/v1",router);



const PORT = process.env.PORT || 5000;

//sockets
const socketUserMapping = {

}
//jab connection hoga current client or new connection tab new socket id console karo
io.on('connection',(socket)=>{
    console.log('new Connection',socket.id);

    socket.on(ACTIONS.JOIN,({roomId , user})=>{
    socketUserMapping[socket.id] = user;
        //getting all clients present in room-> it will return map
        const clients = Array.from (io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach(clientId=>{
            io.to(clientId).emit(ACTIONS.ADD_PEER,{
                       
            });

            socket.emit(ACTIONS.ADD_PEER,{});

            //creating and joining the room from roomId
            socket.join(roomId);
        })

        console.log(clients)
    });

})

server.listen(PORT , ()=>{
    console.log("server started on",PORT);
})




App.get("/",(req ,res)=>{
    res.send("working")
})

