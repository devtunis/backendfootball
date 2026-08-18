

 

import jwt from "jsonwebtoken"

export function verifyTokenRefresh(req,tokenUrl) {



  if (!tokenUrl) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  try {
    const decoded = jwt.verify(
      tokenUrl,
      process.env.REFRESH_TOKEN_SECRET
    );
     req.user2 = decoded

 
    return {valid :true , decoded}
        
      
 
   

  } catch (error) {
    return   {err :error.message , text : "Invalid or expired token Refresh token aa"}
    
  }
}
 






