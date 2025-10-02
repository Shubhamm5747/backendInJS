import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path : './.env'
})

//async method returns a promise so we are handling it here
connectDB()
.then(() => {
    //before this listen we can put that app.on error code as well
    app.listen(process.env.PORT || 8000, () => {
        console.log(` Server is running at Port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDb connection failed!!! ", err)
})

















/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from 'express'
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {     //app.on is used to listen for an event and here that event is an error
            console.log("Error : ",error )
            throw error
        })

        app.listen(process.env.PORT, ()=>{ //server connected
            console.log(`App is listening on Port : ${process.env.PORT}`);
        })
        
    } catch (error) {
        console.error("ERROR", error)
        throw error
        
    }

})()
*/