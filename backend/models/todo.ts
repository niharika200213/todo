import mongoose from "mongoose";
import { Schema } from "mongoose";
const todoSchema = new Schema({
    title: String,
    content: String
}, { timestamps: true });
const todos = mongoose.model('todos', todoSchema);
module.exports = todos;