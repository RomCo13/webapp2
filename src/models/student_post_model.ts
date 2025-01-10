import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentPost extends Document {
    title: string;
    content: string;
    userId: mongoose.Types.ObjectId;
    comments: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const StudentPostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, {
    timestamps: true
});

export const StudentPostModel = mongoose.model<IStudentPost>('StudentPost', StudentPostSchema);