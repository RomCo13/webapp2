// import { Express } from "express";
// import request from "supertest";
// import initApp from "../app";
// import mongoose from "mongoose";
// import User, { IUser } from "../models/user_model";
// import { IStudentPost, StudentPost } from "../models/student_post.model";
// let app: Express;
// const user: IUser = {
//   email: "test@student.post.test",
//   password: "1234567890",
// }
// let accessToken = "";
// beforeAll(async () => {
//   app = await initApp();
//   console.log("beforeAll");
//   await StudentPost.deleteMany();
//   await User.deleteMany({ 'email': user.email });
//   const response = await request(app).post("/auth/register").send(user);
//   user._id = response.body._id;
//   const response2 = await request(app).post("/auth/login").send(user);
//   accessToken = response2.body.accessToken;
// });
// afterAll(async () => {
//   await mongoose.connection.close();
// });
// const post1: IStudentPost = {
//   _id: new mongoose.Types.ObjectId(), // Unique identifier for the post
//   student: new mongoose.Types.ObjectId(), // Reference to a student
//   title: "Understanding Mongoose Relationships",
//   content: "This post explains how to use Mongoose to create relationships between documents.",
//   comments: [
//       new mongoose.Types.ObjectId(), // Reference to comment 1
//       new mongoose.Types.ObjectId(), // Reference to comment 2
//   ],
//   createdAt: new Date("2025-01-01T12:00:00Z"), // Example creation date
//   updatedAt: new Date("2025-01-05T15:30:00Z"), // Example last updated date
// };
// describe("Student post tests", () => {
//   const addStudentPost = async (post: IStudentPost) => {
//     const response = await request(app)
//       .post("/studentpost")
//       .set("Authorization", "JWT " + accessToken)
//       .send(post);
//     expect(response.statusCode).toBe(201);
//     expect(response.body.owner).toBe(user._id);
//     expect(response.body.title).toBe(post.title);
//     expect(response.body.message).toBe(post.message);
//   };
//   test("Test Get All Student posts - empty response", async () => {
//     const response = await request(app).get("/studentpost");
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toStrictEqual([]);
//   });
//   test("Test Post Student post", async () => {
//     addStudentPost(post1);
//   });
//   test("Test Get All Students posts with one post in DB", async () => {
//     const response = await request(app).get("/studentpost");
//     expect(response.statusCode).toBe(200);
//     const rc = response.body[0];
//     expect(rc.title).toBe(post1.title);
//     expect(rc.message).toBe(post1.message);
//     expect(rc.owner).toBe(user._id);
//   });
// });
//# sourceMappingURL=student_post.test.js.map