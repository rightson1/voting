import { models, model, Schema } from "mongoose";

const CandidateSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    adm: {
        type: String,
        required: true,
    },

    pic: {
        type: String,
        required: false,
        default: "",
    },
    avatar: {
        type: String,
        required: false,
        default: "",
    },
    bio: {
        type: String,
        required: false,
        default: "No bio",
    },
    admin: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    positionId: {
        type: String,
        required: true,
    },
    manifesto: {
        type: String,
        required: false,
        default: "No Manifesto",
    },
    votes: {
        type: Array,
        required: false,
        default: [],
    },
});

export default models.Candidate || model("Candidate", CandidateSchema);