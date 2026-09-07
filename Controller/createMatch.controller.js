 
import RoomMatches from "../Models/RoomMatches.js"
import { httpStatusCodes } from "../Status/httpStatusCodes.js"

const {SUCCESS ,BAD_REQUEST}   = httpStatusCodes   
export const createMatchcontroller =async (req,res) => {
    const {roomId,time,location,maxplayer,description} = req.body
 

    if(!roomId || !time || !location || !maxplayer || !description       ){
        return res.status(BAD_REQUEST).json({
            message:"missing fields",
            code:1
        })
    }
  try{

    const findRoom = await RoomMatches.findOne({roomId}).select("ownerId -_id")
    if(!findRoom){

         return res.status(BAD_REQUEST).json({
            message:"no room with id",
            code:2
        })
    }
    if(findRoom.ownerId!=req.user.id){
        return res.status(BAD_REQUEST).json({
            message:"you not authorzied to do this request",
            code:3
        })
    }

 
 // description here do trim  for description and found about it
    await RoomMatches.findOneAndUpdate(
        { roomId },
        {
            $push:{
                uncomingMatches : {
                    time,
                    location,
                    maxplayer,
                    description,
                    author:req.user.user_name,
                }
            }
        }


)
 

    
    res.status(SUCCESS).json({
       roomId,time,location,maxplayer,description   
    })
  }catch(err){
    res.status(BAD_REQUEST).json({
        message:err.message
    })
  }
}
 