import mongoose from "mongoose";

const cached = globalThis._mongoose ??= { promise: null };

export async function dbconnect() {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not set");
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB_URI).catch((err) => {
            cached.promise = null;
            throw err;
        });
    }

    return cached.promise;
}
