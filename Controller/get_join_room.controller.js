
import RoomsFollow from "../Models/filter.js"
import Rooms from "../Models/room.js"
import { httpStatusCodes } from "../Status/httpStatusCodes.js"
const { BAD_REQUEST ,SUCCESS} = httpStatusCodes


export const HandedlGetRoom = async(req,res)=>{
    const {roomId} = req.body
    if( !roomId){
        res.status(httpStatusCodes.BAD_REQUEST).json({error:"missing fields"})
        return 
    }

    
    try{
     

        const findCustomRoom = await Rooms.findOneAndUpdate(
            {
                roomId,
                ownerId : {$ne : req.user.id},
                "queeRequestJoinRoom.userId" : {$ne : req.user.id}
            }
            ,{
                $addToSet:{
                     queeRequestJoinRoom : 
                        
                      {
                        userId : req.user.id , 
                        img : req.user.img,
                        name:req.user.user_name ,
                        roomId
                      }
                    
                }
            }
             ,{
                returnDocument:"after"
             }
         
        
        )
      

        if(!findCustomRoom)
        {
         return   res.status(BAD_REQUEST)
            .json({
                 error: "The request could not be completed. The room may not exist, you may not be a member, or the request may be a duplicate."
            })
        }
 


        


       return res.status(SUCCESS).json({message : "request sent" ,nameRoom:findCustomRoom.nameRoom})
    }catch(error){
        res.status(httpStatusCodes.BAD_REQUEST)
    }
}

 

 