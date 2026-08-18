import mongoose from "mongoose"



const exportRefreshToken = new mongoose.Schema({
    id:{type : String, unique : true  },

    refresh_token_hash : {type : String ,  },

    iat :{ type : String, },

    exp : {type :String },
    revoked :{
        type:Boolean ,default:true
    },
    time : {
        type : String ,
    }
 , 
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});


 
const refresh_token = mongoose.model('refresh_token', exportRefreshToken);
export default refresh_token