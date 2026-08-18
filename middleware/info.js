
export const InfoMiddle = (data) => {

    return (req,res,next)=>{

      if(data=="hello"){
        
      req.user = {
        id: 1,
        name: "John"
    };
          next()
      }else{
        return      res.status(401).json({
            message: "No token provided"
        });
      }
        
    }

}
