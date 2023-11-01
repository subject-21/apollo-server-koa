import { Document, model, Model, Schema, SchemaDefinition } from "mongoose";
import { Review, reviewModel } from "./review.model";

export interface Game {
    title: String
    platform: [String]
    reviews: [Review]
}


export const gameModel: Model<Game & Document> = model<Game & Document>(
    "games",
    new Schema<Game & Document>({
        title: {
            type: String,
            required: true
        },
        platform: {
            type: [String],
            required: true
        },
        reviews: {
            type: [],
            required: true
        }
    })
)

