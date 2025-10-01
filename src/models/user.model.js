import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullname : {
        type : String,
        required : true, 
        trim : true,
        index : true
    },
    avatar : {
        type : String, //cloudinary URL
        required : true,
    },
    coverImage : {
        type : String, //cloudinary URL
    },
    watchHistory : {
        type : Schema.Types.ObjectId,
        ref : "Video"
    },
    password : {
        type : String,
        required : [true, "Password is required"]
    },
    refreshToken : {
        type : String
    }
},
    {
        timestamps : true
    }
)

//middleware of mongoose that is used to hash the password whenever its modified
//using normal function instead of arrow in callback to get access of this keyword
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
})

//to check password is true or false or input pass is matching the hash 
//just like custom hooks, it is a custom something
UserSchema.methods.isPasswordcorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//async not needed cs its usually fast
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            //payload we wanna set in AT
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', UserSchema)