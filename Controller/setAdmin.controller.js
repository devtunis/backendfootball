import { connect } from "mongoose"
import Rooms from "../Models/room.js"
import { httpStatusCodes } from "../Status/httpStatusCodes.js"
 
export const HandelSetAdmin = async(req,res)=>{
    const {adminId ,roomId ,name  , img} = req.body
    const CurrentRequestID =  req.user.id 
    
    if(!adminId || !roomId ||!name || !img){
        return res.status(httpStatusCodes.BAD_REQUEST).json({
            err:"missing adminID"
        })
    }
   try{

    const checkPermision = await Rooms.findOne({roomId}).select("ownerId -_id")
    const ownerIdRoom = checkPermision 
    if(!ownerIdRoom){
        return res.status(httpStatusCodes.BAD_REQUEST).json({
            message : "room not exisit"
        })
    }
   
    if(ownerIdRoom.ownerId!=CurrentRequestID){
        return res.status(httpStatusCodes.FORBIDDEN).json({
            error: "You are not authorized to perform this action."
        })
    }

    // this error fix it 
    // Solution const ValideDuplicateMember = checkPermision.members.find((item)=>item.membersId ==userId)

     const ValideDuplicateMember = await  Rooms.findOne({
        "admins.adminId":adminId
     })
 
      
     if(ValideDuplicateMember){
          
        return res.status(httpStatusCodes.CONFLICT)
        .json({
            message : "conflit Admins"
        })
     }
    const findRoom =await  Rooms.findOneAndUpdate(
        {roomId},
        { $push: { admins: {adminId,name,img} }},
        {returnDocument  :"after"}
    ) 
  
    if(!findRoom){
        return res.status(httpStatusCodes.BAD_REQUEST)
        .json({
            err :"document does not  exisit"
        })
    }

     return   res.status(httpStatusCodes.SUCCESS)
     .json({
    message : "sucess setAdmin",
    room : findRoom,
    currentLoginUser : CurrentRequestID 
})


   }catch(err){
    return res.status(httpStatusCodes.BAD_REQUEST).json({
        error : err.message
    })
   }


 

}