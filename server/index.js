const express = require("express");
const router = require("./routes/route")
const App = express();
const {dbConnect} = require('./config/dbConnect');
require("dotenv").config();
const cloudinary = require('./config/cloudinary');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

//creating  http server 
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

//sockets object -> to keep track which socket id belongs to which socket
const socketUserMapping = {

}
//jab connection hoga current client or new connection tab new socket id console karo
io.on('connection',(socket)=>{
    console.log('new Connection',socket.id);

    //jab current socket (join event) listen krega toh y krna hai
    socket.on(ACTIONS.JOIN,({roomId , user})=>{
        
    //saving socket id as key and user as value
    socketUserMapping[socket.id] = user;

        //getting all clients present in current room-> it will return map
        //io.sockets.adapter.rooms.get(roomId) y return krega jo roomId pass kari hai usme kitne clients connected hai as a map so we are converting map into array
        //agar koi ni hai toh empty array return krdo, 
        const clients = Array.from (io.sockets.adapter.rooms.get(roomId) || []);

        //for each client present in passed roomId -> emit add-peer custom event for them
        clients?.forEach(clientId=>{
            //emitting add-peer event for each clients present in room for current user or client
            //jo bhi clients hai phle k room k andar unko add-peer event emit kro jiski peer id hogi current user
            io.to(clientId).emit(ACTIONS.ADD_PEER,{
                    peerId:socket.id,
                    createOffer:false,
                    user:user
            });


            //current client or user jisne abhi room new room join kia hai usko bhi add-event emit kro
            //jo current user hai usko bhi add peer event emit kro jisme peer id hogi sarree clients jo phle se room m present hai
            socket.emit(ACTIONS.ADD_PEER,{
                peerId: clientId,
                createOffer:true,
                user:socketUserMapping[clientId]
            });

     
           
        });

        console.log("before socket joining the room")
        //creating and joining the room from roomId
        socket.join(roomId);

    });

    //handle relay ice
    socket.on(ACTIONS.RELAY_ICE,({peerId,icecandidate})=>{
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE,{
            peerId:socket.id,
            icecandidate
        })
    });

    //handle relay sdp
    socket.on(ACTIONS.RELAY_SDP,({peerId,sessionDescription} )=>{
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION,{
            peerId:socket.id,
            sessionDescription
        })
    });


    //handle mute and unmute
    socket.on(ACTIONS.MUTE, ({roomId,userId})=>{
        const clients  = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach( clientId =>{
            io.to(clientId).emit(ACTIONS.MUTE,{
                peerId:socket.id , userId
            });
        })
    })

    socket.on(ACTIONS.UN_MUTE, ({roomId,userId})=>{
        const clients  = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach( clientId =>{
            io.to(clientId).emit(ACTIONS.UN_MUTE,{
                peerId:socket.id , userId
            });
        })
    })

    socket.on(ACTIONS.MUTE_INFO, ({ userId, roomId, isMute }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            if (clientId !== socket.id) {
                console.log('mute info');
                io.to(clientId).emit(ACTIONS.MUTE_INFO, {
                    userId,
                    isMute,
                });
            }
        });
    });

    //leaving the room
    const leaveRoom = ()=>{
        const {rooms} = socket;
        Array.from(rooms).forEach(roomId=>{
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId)|| []);
        

        clients.forEach(clientId=>{
            io.to(clientId).emit(ACTIONS.REMOVE_PEER,{peerId:socket.id,userId:socketUserMapping[socket.id]?.id})
           // socket.emit(ACTIONS.REMOVE_PEER,{peerId:clientId,userId:socketUserMapping[clientId]?.id})
           
        })
        socket.leave(roomId)
    });

        delete socketUserMapping[socket.id];
       
    }
    socket.on(ACTIONS.LEAVE,leaveRoom)
    socket.on('disconnecting',leaveRoom)

})



server.listen(PORT , ()=>{
    console.log("server started on",PORT);
})




App.get("/",(req ,res)=>{
    res.send("working")
})

