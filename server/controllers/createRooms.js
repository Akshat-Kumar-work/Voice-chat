const zod = require("zod")
const Room = require("../models/room");

exports.createRooms = async (req,res)=>{
    try{
        const Topicschema = zod.string();
        const roomTypeSchema = zod.string();
        const{type,topic} = req.body;

        Topicschema.parse(topic);
        roomTypeSchema.parse(type);


        const userId = req.body.user._id;

        const room = await Room.create({
            topic:topic,
            ownerId:userId,
            roomType:type,
            speakers:[userId]
        })
        console.log(room);

       return res.status(200).json({
            success:true,
            mess:"room created ",
            room:room
        })  

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            mess:"unable to create room"
        })

    }
}


exports.fetchRooms = async(req,res)=>{
    try{
        const resposne = await Room.find({roomType:"open"}).populate("speakers").populate("ownerId").exec();
        
        return res.status(200).json({
            success:true,
            mess:"room fetched successfully",
            roomsList:resposne
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            mess:"unable to fetch rooms"
        })
    }
}