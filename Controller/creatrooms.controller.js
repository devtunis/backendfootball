import { connect } from "mongoose"
import RoomsFollow from "../Models/filter.js"
import Rooms from "../Models/room.js"
import { httpStatusCodes } from "../Status/httpStatusCodes.js"
import { ShortId } from "../util/ShortsId.js"

export const HandelCreatRoom = async(req,res)=>{
    const {nameRoom ,bioRoom , img } = req.body
 
 
 

    if(   !nameRoom || !bioRoom ||  !img ){
        res.status(httpStatusCodes.BAD_REQUEST).json({
            message : "missing field"
        })
    }
    const UniqueId = ShortId()
    
    let Room ={

          roomId :UniqueId,
          ownerId:req.user.id,
          nameRoom ,
          bioRoom,
          img ,
          members: [
           {
            membersId:req.user.id,
            name:req.user.user_name,
            img : req.user.img
            
        }       
          ]



    } 
    try{

        const SaveRoom = await new Rooms(Room)
         await SaveRoom.save()


         const FindYouInRommFolow = await RoomsFollow.findOne({id:req.user.id})
    
         if(!FindYouInRommFolow){

         const FollowList =  await new RoomsFollow({
            id :req.user.id,
            roomsfollow : [UniqueId]
        })

          await FollowList.save()
  
         }else{
        
           await RoomsFollow.findOneAndUpdate(
            { id: req.user.id },
            { $addToSet: { roomsfollow: UniqueId } },
            { upsert: true}
        );
         }
     


       return res.status(httpStatusCodes.SUCCESS)
           .json(SaveRoom)



    }catch(err){
          
       return  res.status(httpStatusCodes.BAD_REQUEST).json({
            error:err.message
        })
    }


  

}