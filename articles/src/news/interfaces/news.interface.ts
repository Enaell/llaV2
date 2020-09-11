import { Document } from 'mongoose';

export interface News extends Document {
    readonly owner: string;
    readonly subjects: [string];
    readonly title: string;
    readonly body: string;
    readonly pictures: [string];
    readonly created_at: Date;
}