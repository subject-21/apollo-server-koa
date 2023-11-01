import { Document, model, Model, Schema, SchemaDefinition } from "mongoose";
import { Review, reviewModel } from "./review.model";

export interface Author {
    name: String
    verified: Boolean
    reviews: [Review]
}

export const authorModel: Model<Author & Document> = model<Author & Document>(
    "authors",
    new Schema<Author & Document>({
        name: {
            type: String,
            required: true
        },
        reviews: {
            type: [],
            required: true,
        },
        verified: {
            type: Boolean,
            required: true
        },
    })
)

