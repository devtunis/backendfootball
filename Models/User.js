import mongoose from "mongoose"



const userSchema = new mongoose.Schema({
    id:{
        type : String,
    },
    user_name: { 
    type: String,
    unique : true ,
   
  },
  img: { 
    type: String, 
  },
  password : {
    type : String ,
  },
 
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});


 
const User = mongoose.model('Users', userSchema);
export default User