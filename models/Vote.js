import { models, model, Schema } from "mongoose";

const VoteSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    adm: {
        type: String,
        required: true,
    },
    voterId: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
        required: false,
        default: "",
    },

    position: {
        type: String,
        required: true,
    },
    positionId: {
        type: String,
        required: true,
    },
    candidateName: {
        type: String,
        required: true,
    },
    candidateId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default models.Vote || model("Vote", VoteSchema);