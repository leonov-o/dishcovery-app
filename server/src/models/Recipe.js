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
                type: String,
                required: true
            },
            unit: {
                type: String,
                required: true
            }
        }
    ],
    nutritionalValue: {
        calories: {
            type: String
        },
        proteins: {
            type: String
        },
        fats: {
            type: String
        },
        carbohydrates: {
            type: String
        }
    },
    instructions: String,
    description: String,
    recommendations: String,
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
