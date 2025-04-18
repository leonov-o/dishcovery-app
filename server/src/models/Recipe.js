import mongoose from "mongoose";

const Recipe = new mongoose.Schema({
    title: String,
    ingredients: [
        {
            ingredient: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Ingredient",
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true
            }
        }
    ],
    instructions: String,
    description: String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
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
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    views: {
        type: Number,
        default: 0
    },

}, { timestamps: true });

export default mongoose.model("Recipe", Recipe);
