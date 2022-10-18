import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema({
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
});
export default models.Admin || model("Admin", AdminSchema);