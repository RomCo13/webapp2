import express from "express";
const router = express.Router();
import studentPostController from "../controllers/student_post_controller";
import authMiddleware from "../common/auth_middleware";

/**
 * @swagger
 * tags:
 *   name: StudentPosts
 *   description: API for managing student posts
 */

/**
 * @swagger
 * /:
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
router.get("/", studentPostController.get.bind(studentPostController));

/**
 * @swagger
 * /{id}:
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
router.get("/:id", studentPostController.getById.bind(studentPostController));

/**
 * @swagger
 * /:
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
 *       500:
 *         description: Server error
 */
router.post("/", authMiddleware, studentPostController.post.bind(studentPostController));

/**
 * @swagger
 * /{id}:
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
router.put("/:id", authMiddleware, studentPostController.putById.bind(studentPostController));

/**
 * @swagger
 * /{id}:
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
router.delete("/:id", authMiddleware, studentPostController.deleteById.bind(studentPostController));

export default router;