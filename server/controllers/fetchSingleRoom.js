const mongoose = require('mongoose');
const Room = require('../models/room'); // Make sure you import your Room model

exports.fetchSingleRoom = async (req, res) => {
    try {
        const roomId = req.params.roomId; // Remove any extra whitespace
        // const isValidObjectId = mongoose.Types.ObjectId.isValid(roomId);

        // if (!isValidObjectId) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid room ID format"
        //     });
        // }
        console.log("room id",roomId)
  
        const roomData = await Room.findById(roomId );
        if (!roomData) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: roomData
        });
    } catch (err) {
        console.log("Error while fetching single room", err);
        return res.status(500).json({
            message: "Unable to fetch",
            success: false
        });
    }
}
