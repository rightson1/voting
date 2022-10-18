import { Schema, models, model } from "mongoose";

const JobSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    admin: {
        type: String,
        required: true,
    },
    requirement: {
        type: String,
        required: true,
    },
}, { timestamps: true });
export default models.Job || model("Job", JobSchema);