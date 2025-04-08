import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        // trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['shipper' , 'carrier'],
    }

    } , { timestamps: true}  )

export const userModel =  model("User", userSchema)
    
