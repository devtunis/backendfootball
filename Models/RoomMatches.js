import mongoose from "mongoose";
 


const exportRoomMatches = new mongoose.Schema({
    
    roomId  :{
        type:String,
        unique:true
    },
    nameroom:{
        type:String,
        
    },
    ownerId:{
        type:String
    },
    uncomingMatches : [
        {
            time: {type:String},
            location : {type:String},
            maxplayer : {type:String},
            description :{type:String}
        }
    ]
    ,
    finishedmatches : [
        {
        imgA:{type:String},
        imgB:{type:String},
        result:{type:String}
        }
    ]
    ,
    bestplayer: {
    type: {
        name: String,
        likes: Number,
        img: String,
        goals: Number
    },
    default: {
        name: "",
        likes: 0,
        img: "",
        goals: 0
    }
    }
 
});


 
const RoomMatches = mongoose.model('RoomMatches', exportRoomMatches);
export default RoomMatches