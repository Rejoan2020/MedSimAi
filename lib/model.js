import mongoose from "mongoose";

// Registers a Mongoose model, replacing it on dev hot reload so schema changes apply
export function defineModel(name, schema) {
    if (process.env.NODE_ENV !== "production" && mongoose.models[name]) {
        mongoose.deleteModel(name);
    }
    return mongoose.models[name] || mongoose.model(name, schema);
}
