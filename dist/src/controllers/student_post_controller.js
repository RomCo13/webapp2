"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentPostController = void 0;
const student_post_model_1 = require("../models/student_post.model");
class StudentPostController {
    static createPost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!studentId) {
                    return res.status(401).json({
                        status: 'error',
                        message: 'User not authenticated'
                    });
                }
                const postData = {
                    student: studentId,
                    title: req.body.title,
                    content: req.body.content
                };
                const post = new student_post_model_1.StudentPost(postData);
                const savedPost = yield post.save();
                const populatedPost = yield savedPost.populate('student', 'name email');
                res.status(201).json({
                    status: 'success',
                    data: populatedPost
                });
            }
            catch (error) {
                console.error('Error creating student post:', error);
                res.status(500).json({
                    status: 'error',
                    message: 'Failed to create student post',
                    error: error.message
                });
            }
        });
    }
    static getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield student_post_model_1.StudentPost.find()
                    .populate('student', 'name email')
                    .sort({ createdAt: -1 });
                res.status(200).json({
                    status: 'success',
                    data: posts
                });
            }
            catch (error) {
                console.error('Error fetching student posts:', error);
                res.status(500).json({
                    status: 'error',
                    message: 'Failed to fetch student posts',
                    error: error.message
                });
            }
        });
    }
    static getPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield student_post_model_1.StudentPost.findById(req.params.id)
                    .populate('student', 'name email');
                if (!post) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Post not found'
                    });
                }
                res.status(200).json({
                    status: 'success',
                    data: post
                });
            }
            catch (error) {
                console.error('Error fetching student post:', error);
                res.status(500).json({
                    status: 'error',
                    message: 'Failed to fetch student post',
                    error: error.message
                });
            }
        });
    }
    static putById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = {
                    title: req.body.title,
                    content: req.body.content
                };
                const updatedPost = yield student_post_model_1.StudentPost.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate('student', 'name email');
                if (!updatedPost) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Student post not found'
                    });
                }
                res.status(200).json({
                    status: 'success',
                    data: updatedPost
                });
            }
            catch (error) {
                console.error('Error updating student post:', error);
                res.status(500).json({
                    status: 'error',
                    message: 'Failed to update student post',
                    error: error.message
                });
            }
        });
    }
    static deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedPost = yield student_post_model_1.StudentPost.findByIdAndDelete(id);
                if (!deletedPost) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Student post not found'
                    });
                }
                res.status(200).json({
                    status: 'success',
                    message: 'Student post deleted successfully'
                });
            }
            catch (error) {
                console.error('Error deleting student post:', error);
                res.status(500).json({
                    status: 'error',
                    message: 'Failed to delete student post',
                    error: error.message
                });
            }
        });
    }
}
exports.StudentPostController = StudentPostController;
//# sourceMappingURL=student_post_controller.js.map