import jwt from "jsonwebtoken"

export function verifyJWT(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    req.user = decoded;
 
    next();

  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}
 




 
 




export function verifyJWTComingSocket(tokenUrl) {



  if (!tokenUrl) {
    return "missing token"
  }

  try {
    const decoded = jwt.verify(
      tokenUrl,
      process.env.ACCESS_TOKEN_SECRET
    );
      
     return decoded
        
      
 
   

  } catch (error) {
    return   {err :error.message , text : "Invalid or expired token Refresh token aa"}
    
  }
}
 


