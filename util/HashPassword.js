import bcrypt  from "bcrypt"

import crypto from "crypto"
export async function HashPasword(passwordClair) {
    const saltRounds = 10;  
    
    return  await bcrypt.hash(passwordClair, saltRounds);
}



export async function VerifyPassword(passwordClair, passwordHash) {
    const isMatch = await bcrypt.compare(passwordClair, passwordHash);
    return isMatch;
}

export async function hashToken(token) {
       return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
}

export async function hashPasswordfn(Password) {
       return crypto
        .createHash("sha256")
        .update(Password)
        .digest("hex");
}



 
 