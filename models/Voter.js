import { Schema, model, models } from "mongoose";
const VoterSchema = new Schema({
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
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default: "",
    },
    pic: {
        type: String,
        required: false,
        default: "",
    },
    candidate: {
        type: Boolean,
        required: false,
        default: false,
    },
}, {
    timestamps: true,
});
export default models.Voter || model("Voter", VoterSchema);