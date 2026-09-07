 
import RoomMatches from "../Models/RoomMatches.js"
import { httpStatusCodes } from "../Status/httpStatusCodes.js"


export const CreateFinshedMatchController = async (req,res) => {

     const {SUCCESS ,BAD_REQUEST}   = httpStatusCodes   

     const {roomId ,imgA,nameA,imgB,nameB,result}  =req.body 
     if(!roomId  || !imgA || !nameA || !imgB || !nameB || !result){
        return res.status(BAD_REQUEST).json({
            message:"missing fields",
            
        })
     }
    try{




        
            const findRoom = await RoomMatches.findOne({roomId}).select("ownerId -_id")
            if(!findRoom){
        
                 return res.status(BAD_REQUEST).json({
                    message:"no room with id",
                    
                })
            }
            if(findRoom.ownerId!=req.user.id){
                return res.status(BAD_REQUEST).json({
                    message:"you not authorzied to do this request",
                     
                })
            }
            await RoomMatches.findOneAndUpdate(
                    { roomId },
                    {
                        $push:{
                            finishedmatches : {
                                imgA,
                                nameA,
                                imgB,
                                nameB,
                                result,
                            }
                        }
                    }


            ) 
          
            


        return res.status(SUCCESS).json({message:"create finshed match"})

    }catch(error){
        return  res.status(BAD_REQUEST).json({
        message:err.message
    })
    }
  
}

 