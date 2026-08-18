import mongoose from "mongoose";

export const ConnectionTodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB ✅!");
  } catch (err) {
    console.error("Connection error:", err.message);
  }
};