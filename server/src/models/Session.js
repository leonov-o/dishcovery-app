import mongoose from "mongoose";

const Session = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    refreshToken: String,
    expiresIn: Number
});

export default mongoose.model("Session", Session);
