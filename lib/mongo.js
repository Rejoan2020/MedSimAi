import mongoose from "mongoose";

// Reuse one connection across requests and dev hot reloads
const cached = globalThis._mongoose ??= { promise: null };

export async function dbconnect() {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not set");
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB_URI).catch((err) => {
            // Let the next call retry instead of reusing a failed connection
            cached.promise = null;
            throw err;
        });
    }

    return cached.promise;
}
