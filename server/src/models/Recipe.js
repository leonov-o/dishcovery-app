import mongoose from "mongoose";

const Recipe = new mongoose.Schema({
    title: String,
    ingredients: [String],
    instructions: String,
    description: String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: String,
        ref: "Category"
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    cookTime: Number,
    difficulty: String,
    image: String,
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    views: {
        type: Number,
        default: 0
    },

}, {timestamps: true});

export default mongoose.model("Recipe", Recipe);
