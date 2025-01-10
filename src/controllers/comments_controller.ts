
import Comment from "../models/post_comments";

export const CommentsController = {
  async getCommentsByPostId(req, res) {
    try {
      const { postId } = req.params;
      const comments = await Comment.find({ postId });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving comments", error });
    }
  },

  async createComment(req, res) {
    try {
      const { postId } = req.params;
      const { author, content } = req.body;

      if (!author || !content) {
        return res.status(400).json({ message: "Author and content are required" });
      }

      const newComment = new Comment({
        postId,
        author,
        content,
      });

      console.log (newComment)
      const savedComment = await newComment.save();
      res.status(201).json(savedComment);
    } catch (error) {
      res.status(500).json({ message: "Error creating comment", error });
    }
  },

  async deleteComment(req, res) {
    try {
      const { id } = req.params;
      const deletedComment = await Comment.findByIdAndDelete(id);

      if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting comment", error });
    }
  },
};