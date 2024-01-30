const zod = require("zod")
const Room = require("../models/room");

exports.createRooms = async (req,res)=>{
    try{
        const Topicschema = zod.string();
        const roomTypeSchema = zod.string();
        const{topic,roomType} = req.body;

        Topicschema.parse(topic);
        roomTypeSchema.parse(roomType);

        const room = await Room.create({
            topic:topic,
            userId:req.user._id,
            roomType:roomType,
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