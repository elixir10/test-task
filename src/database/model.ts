import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String
    },

    content: {
        type: String
    }
});

export default mongoose.model("notes", schema);