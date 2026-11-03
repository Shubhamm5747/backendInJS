import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true // to allow browser to send cookies
}))

// .use is used for middlewares and configs
app.use(express.json({limit: "16kb"})) // body-parser, the deserialisation happens here serialised data is converted into json 
app.use(express.urlencoded({extended : true, limit: "16kb"})) //body-parser for data submitted via URL-encoded formats
app.use(express.static("public")) // to save pdf, images, favicons etc. in my server (public assets)
app.use(cookieParser()) //to set or access httpcookie


//routes import
import userRouter from "./routes/user.routes.js"

//routes declaration 
app.use("/api/v1/users", userRouter) //Router-level middleware
// http://localhost:8000/api/v1/users/register

// global error-handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        statusCode,
        success: false,
        message,
        errors: err.errors || [],
        data: null,
        ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {})
    })
})

export { app }