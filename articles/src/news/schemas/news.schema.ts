import * as mongoose from 'mongoose';

export const NewsSchema = new mongoose.Schema({
    owner: String,
    subjects: [String],
    title: String,
    body: String,
    pictures: [String],
    created_at: { type: Date, default: Date.now }
})