import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/voting";
// const MONGO_URL =
//     "mongodb+srv://Rightson:Rightson@nodeexpressproject.afbca.mongodb.net/Votes?retryWrites=true&w=majority";
if (!MONGO_URL) {
    throw new Error(
        "Please define the MONGO_URL environment variable inside .env.local"
    );
}
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function db() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            // bufferMaxEntries: 0
        };

        cached.promise = await mongoose
            .connect(MONGO_URL, opts)
            .then((mongoose) => {
                console.log("connected");
                return mongoose;
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default db;