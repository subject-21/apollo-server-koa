import { Document, model, Model, Schema, SchemaDefinition } from "mongoose";
import { Game, gameModel } from "./game.model";
import { Author, authorModel } from "./author.model";

export interface Review {
    rating: Number
    content: String
    game: Game
    author: Author
}

export const reviewModel: Model<Review & Document> = model<Review & Document>(
    "reviews",
    new Schema<Review & Document>({
        content: {
            type: String,
            required: true
        },
        game: {
            type: gameModel.schema,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        author: {
            type: authorModel.schema
        }
    })
)

