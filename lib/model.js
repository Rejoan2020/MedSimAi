import mongoose from "mongoose";

// Registers a Mongoose model. In development, a model file that changed is re-run on
// hot reload, but Mongoose would keep the old compiled model and silently drop new
// fields; replacing it picks up schema changes without restarting the dev server.
export function defineModel(name, schema) {
    if (process.env.NODE_ENV !== "production" && mongoose.models[name]) {
        mongoose.deleteModel(name);
    }
    return mongoose.models[name] || mongoose.model(name, schema);
}
