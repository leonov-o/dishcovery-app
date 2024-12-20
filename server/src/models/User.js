import mongoose from "mongoose";

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        }
    ],
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model("User", User);
