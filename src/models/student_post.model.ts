import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentPost extends Document {
    student: mongoose.Types.ObjectId;
    content: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

const studentPostSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const StudentPost = mongoose.model<IStudentPost>('StudentPost', studentPostSchema); 