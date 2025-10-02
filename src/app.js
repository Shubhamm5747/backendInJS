import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

// .use is used for middlewares and cofigs
app.use(express.json({limit: "16kb"})) //jo json aarha hai usko configure thru middleware
app.use(express.urlencoded({extended : true, limit: "16kb"})) //urlEncoded ka config
app.use(express.static("public")) // to save pdf images favicons in my server (public assets)
app.use(cookieParser()) //to set or access httpcookie


//routes import
import userRouter from "./routes/user.routes.js"

//routes declaration 
app.use("/api/v1/users", userRouter)
// http://localhost:8000/api/v1/users/register




export { app }