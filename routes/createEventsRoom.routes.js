import express from "express"
 
import { 
    
    CreateFinshedMatchController 
     ,createMatchcontroller
    } from "../Controller/Buffer.controller.js"


const router = express.Router()


router.post("/match",createMatchcontroller)
router.post("/Finished",CreateFinshedMatchController)
 

export default router