import RoomsFollow from "../Models/filter.js"
import Rooms from "../Models/room.js"
import { httpStatusCodes } from "../Status/httpStatusCodes.js"
import { Cache } from "../cache/ServerCash.cache.js"

const useCash = new Cache

const {SUCCESS ,BAD_REQUEST}= httpStatusCodes




const CustomStream = Rooms.watch([], {
  fullDocument: "updateLookup"
});

CustomStream.on("change", (change) => {
   const authorId = change?.fullDocument?.ownerId;
   
   if(useCash.in(authorId+"rooms")){
    useCash.del(authorId+"rooms")
   }
   
    
 
 
});


// hello good font


const changeStream = RoomsFollow.watch([], {
  fullDocument: "updateLookup"
});

changeStream.on("change", (change) => {
   const authorId = change?.fullDocument?.id;
//"delte all the membeer in list [] to refresh adding you incluing me"
 if(authorId){
   if(useCash.get(authorId+"rooms")){
    useCash.del(authorId+"rooms")
    console.log("delete sucess")
   }
 }
 
}); 

 
 
 


export const HandelGetRooms = async(req,res)=>{
  
    try{
         
        
 
          if(useCash.in(req.user.id+"rooms")){
          return  res.status(SUCCESS).json({
                message : "hit the cash",
                info : useCash.get(req.user.id+"rooms")
            })
             

        }
         



        const FindAllRooms = await RoomsFollow.findOne({id:req.user.id}).select("roomsfollow -_id")
        if(!FindAllRooms){
            return res.status(SUCCESS).json({
                err : "you dont follow any rooms ."
            })
        }
        const roomIds  = FindAllRooms.roomsfollow 
        const allRooms = await Rooms.find({
            roomId:{$in  :roomIds }
        }).select("roomId ownerId  nameRoom  bioRoom  img  rate  NumberOfComunnity members   -_id")

        useCash.put(req.user.id+"rooms", allRooms)

       
        
    
       return res.status(SUCCESS).json({
        message : "miss the cash",
        info :allRooms
       })
        
    }
    catch(error){
        res.status(BAD_REQUEST).json({
            err:error.message
        })
    }

}
