
import RoomsFollow from "../Models/filter.js"
import Rooms from "../Models/room.js"
import { httpStatusCodes } from "../Status/httpStatusCodes.js"
const { BAD_REQUEST ,SUCCESS} = httpStatusCodes
 
 export const HandeLDeleteMemberRoom = async(req,res) =>{
    try{

        const {roomId,userId} = req.body 
        if(!roomId){
          return  res.status(BAD_REQUEST).json({err:"missing roomID"})

        }
        if(userId ===  req.user.id){
            return res.status(BAD_REQUEST).json({err : "you can't remove yourself "})
        }

        const removeUserFromRooms = await Rooms.findOneAndUpdate(
            {roomId,
            ownerId : req.user.id,
          
            },
            {
                $pull:{
                    members:{
                        membersId  : {
                            $eq : userId,
                            $ne : req.user.id
                        }   
                        
                    }
                }

            },
            {returnDocument:"after"}
        )


       const removeUserFromFollowRooms = await RoomsFollow.findOneAndUpdate(
        {
            id : userId,
            roomsfollow: roomId

        },
        {
            $pull:{
                roomsfollow :roomId
            }
            
        }
        ,{
            returnDocument:"after"
        }
       )
    

        if(!removeUserFromFollowRooms){
           return res.status(BAD_REQUEST).json({message : "he dont follow this room how you can follow him"})
        }


      return  res.status(SUCCESS).json({info1 :removeUserFromRooms.members ,info2: removeUserFromFollowRooms})
    }
    catch(err){
        return res.status(BAD_REQUEST).json({
            error : err.message
        })
    }
}