import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Student from '../models/student_model';
import { StudentPostModel } from '../models/student_post_model';
import jwt from 'jsonwebtoken';

describe('Comment Routes', () => {
  let token: string;
  let student: any;
  let post: any;

  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/test');
    
    // Create test student
    student = await Student.create({
      name: 'Test Student',
      email: 'test@test.com',
      password: 'password123'
    });

    // Create test post
    post = await StudentPostModel.create({
      title: 'Test Post',
      content: 'Test Content',
      author: student._id
    });

    // Generate token
    token = jwt.sign({ id: student._id }, process.env.JWT_SECRET || 'your-secret-key');
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('POST /api/comments', () => {
    it('should create a new comment', async () => {
      const response = await request(app)
        .post('/api/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Test comment',
          postId: post._id
        });

      expect(response.status).toBe(201);
      expect(response.body.content).toBe('Test comment');
      expect(response.body.author).toBe(student._id.toString());
    });
  });

  describe('GET /api/comments/:postId', () => {
    it('should get all comments for a post', async () => {
      const response = await request(app)
        .get(`/api/comments/${post._id}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
}); 