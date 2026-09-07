import RoomsFollow from "../Models/filter.js"
import Rooms from "../Models/room.js"
import { httpStatusCodes } from "../Status/httpStatusCodes.js"

 






export const HandelAddMember = async(req,res)=>{
    const {userId,roomId ,name,img}  = req.body
    const CurrentRequestID =  req.user.id 
    

    try{

      if(!userId || !roomId ||!name || !img){
        return res.status(httpStatusCodes.SUCCESS).json({err : "missing id"})
      } 


    const findRoom = await  Rooms.findOne({roomId}) 
    const checkPermision = findRoom 

    if(!checkPermision){
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                message : "room not exisit"
            })
        }
      

    if(checkPermision.ownerId!=CurrentRequestID){
            return res.status(httpStatusCodes.FORBIDDEN).json({
                error: "You are not authorized to perform this action."
            })
        }
       
    const ValideDuplicateMember = checkPermision.members.find((item)=>item.membersId ==userId)

      
   
    if(ValideDuplicateMember){
          
        return res.status(httpStatusCodes.CONFLICT)
        .json({
            message : "conflit members"
        })
     }

    
     const HandelUpdateRoom = await Rooms.findOneAndUpdate(
        {roomId},
        {$push :{members :{membersId : userId ,name,img} }},
        {returnDocument  :"after"}

    
    )
   const findId_RoomFollow = await RoomsFollow.findOne({id:userId})

        
   if(!findId_RoomFollow){
    
        const FollowList =  await new RoomsFollow({
                id :userId,
                roomsfollow : [roomId]
            })
    
        await FollowList.save()
      
    }
    else{

            
       await RoomsFollow.findOneAndUpdate(
                { id: userId},
                { $addToSet: { roomsfollow: roomId } },
                { upsert: true}
            )
            
        }
         

        await Rooms.findOneAndUpdate(
            {roomId,
            "queeRequestJoinRoom.userId" :userId
            },
            {
                $pull:{queeRequestJoinRoom : {userId}}
            },
            {returnDocument : "after"}
        )
        
    

    
   return res.status(httpStatusCodes.SUCCESS).json(
        {
            status : "add you ✅"
        }
    )


    }
  
catch(err){
    res.status(httpStatusCodes.BAD_REQUEST).json({
        error :err
    })
}





}