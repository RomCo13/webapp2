import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  content: string;
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentPost',
    required: true,
  }
}, {
  timestamps: true
});

export const CommentModel = mongoose.model<IComment>('Comment', CommentSchema); 