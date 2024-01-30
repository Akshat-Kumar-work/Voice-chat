const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
topic:{
    type:String,
    required:true
},
userId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref: 'User'
},
roomType:{
    type:String,
    required:true
},
speakers:[
    {
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
  
]
});

module.exports = mongoose.model('room',roomSchema);