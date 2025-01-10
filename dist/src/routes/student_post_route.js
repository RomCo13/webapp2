"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const student_post_controller_1 = require("../controllers/student_post_controller");
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
/**
 * @swagger
 * tags:
 *   name: StudentPosts
 *   description: API for managing student posts
 */
/**
 * @swagger
 * /student-posts:
 *   get:
 *     summary: Get all student posts
 *     tags: [StudentPosts]
 *     responses:
 *       200:
 *         description: List of student posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", student_post_controller_1.StudentPostController.getPosts);
/**
 * @swagger
 * /student-posts/{id}:
 *   get:
 *     summary: Get a student post by ID
 *     tags: [StudentPosts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student post
 *     responses:
 *       200:
 *         description: Student post retrieved successfully
 *       404:
 *         description: Student post not found
 *       500:
 *         description: Server error
 */
router.get("/:id", student_post_controller_1.StudentPostController.getPostById);
/**
 * @swagger
 * /student-posts:
 *   post:
 *     summary: Create a new student post
 *     tags: [StudentPosts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student post created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", auth_middleware_1.default, student_post_controller_1.StudentPostController.createPost);
/**
 * @swagger
 * /student-posts/{id}:
 *   put:
 *     summary: Update a student post by ID
 *     tags: [StudentPosts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student post updated successfully
 *       404:
 *         description: Student post not found
 *       500:
 *         description: Server error
 */
router.put("/:id", auth_middleware_1.default, student_post_controller_1.StudentPostController.putById);
/**
 * @swagger
 * /student-posts/{id}:
 *   delete:
 *     summary: Delete a student post by ID
 *     tags: [StudentPosts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student post
 *     responses:
 *       200:
 *         description: Student post deleted successfully
 *       404:
 *         description: Student post not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", auth_middleware_1.default, student_post_controller_1.StudentPostController.deleteById);
exports.default = router;
//# sourceMappingURL=student_post_route.js.map