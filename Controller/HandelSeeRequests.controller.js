import { Cache } from "../cache/ServerCash.cache.js"
import RoomsFollow from "../Models/filter.js";
import Rooms from "../Models/room.js"
import { httpStatusCodes } from "../Status/httpStatusCodes.js"




const CashRequest = new Cache



const CustomStream = Rooms.watch([], {
  fullDocument: "updateLookup"
});

CustomStream.on("change", (change) => {
   const authorId = change?.fullDocument?.ownerId;
   const RoomId = change?.fullDocument?.roomId
   if(CashRequest.in(authorId+"request"+RoomId)){
    CashRequest.del(authorId+"request"+RoomId)
   }
   
    
 
 
});
 
 const CustomFollowRoom = RoomsFollow.watch([], {
  fullDocument: "updateLookup"
});
 
 CustomFollowRoom.on("change", (change) => {
   const authorId = change?.fullDocument?.ownerId;
   const RoomId = change?.fullDocument?.roomId
   console.log("something is change ? catch it ")
 
   if(CashRequest.in(authorId+"request"+RoomId)){
    CashRequest.del(authorId+"request"+RoomId)
   }
   
    
 
 
});
 

 

 





const {SUCCESS ,BAD_REQUEST}= httpStatusCodes
export const HandelSeeRequests = async(req,res)=>{
   

    try{
        const userId = req.user.id
        const IDROM = req.body.roomId
         const isyoumember =  await Rooms.findOne({roomId:IDROM,
          "members.membersId":userId
         })
    
         if(!isyoumember){
             return  res.status(200).json({info:"return to team home"})
         }

      

        if(CashRequest.in(userId+"request"+IDROM)){
          return res.status(SUCCESS).json({
            info : "hit the cash",
            isAdmin :  CashRequest.get(userId+"request"+IDROM).ownerId == req.user.id,
            data : CashRequest.get(userId+"request"+IDROM) 
          })
        }

       
    




        const notfication = await Rooms.findOne({ownerId:req.user.id , roomId  : IDROM })
   
       
        if(!notfication){
          return  res.status(SUCCESS)
            .json({
                info : "you not the owner" ,
               data :[],
               deep : notfication
            })
        }
        CashRequest.put(userId+"request"+IDROM,notfication.queeRequestJoinRoom)
 
      

      return  res.status(SUCCESS).json({info:"miss cash",data:notfication.queeRequestJoinRoom ,isAdmin:notfication.ownerId==req.user.id})
    }catch(err){
      
       res.status(BAD_REQUEST).json({
        message : err.message
       })
    }

}