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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("../models/student.model");
const user_model_1 = __importDefault(require("../models/user_model"));
// Add proper mock for Student model
jest.mock('../models/student.model', () => ({
    Student: {
        create: jest.fn().mockImplementation((data) => Promise.resolve(data)),
        find: jest.fn().mockResolvedValue([{
                name: "John Doe",
                _id: "test-id",
            }]),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
        deleteMany: jest.fn().mockResolvedValue({}),
    }
}));
let app;
let accessToken;
const user = {
    email: "testStudent@test.com",
    password: "1234567890",
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll");
    yield student_model_1.Student.deleteMany();
    user_model_1.default.deleteMany({ 'email': user.email });
    yield (0, supertest_1.default)(app).post("/auth/register").send(user);
    const response = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
    accessToken = response.body.accessToken;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
const student = {
    name: "John Doe",
    _id: "test-id",
};
describe("Student tests", () => {
    const addStudent = (student) => __awaiter(void 0, void 0, void 0, function* () {
        // Mock Student.create to resolve successfully
        student_model_1.Student.create.mockResolvedValueOnce(Object.assign(Object.assign({}, student), { save: jest.fn().mockResolvedValue(true) }));
        const response = yield (0, supertest_1.default)(app)
            .post("/students")
            .set("Authorization", "JWT " + accessToken)
            .send(student);
        expect(response.statusCode).toBe(201);
    });
    test("Test Get All Students - empty response", () => __awaiter(void 0, void 0, void 0, function* () {
        student_model_1.Student.find.mockResolvedValueOnce([]);
        const response = yield (0, supertest_1.default)(app).get("/students").set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([]);
    }));
    test("Test Post Student", () => __awaiter(void 0, void 0, void 0, function* () {
        addStudent(student);
    }));
    test("Test Get All Students with one student in DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockStudent = {
            name: "John Doe",
            _id: "test-id",
        };
        student_model_1.Student.find.mockResolvedValueOnce([mockStudent]);
        const response = yield (0, supertest_1.default)(app).get("/students").set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        const st = response.body[0];
        expect(st.name).toBe(student.name);
        expect(st._id).toBe(student._id);
    }));
    test("Test Post duplicate Student", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock Student.create to reject with duplicate key error
        const error = new Error('Duplicate key error');
        error.code = 11000;
        error.name = 'MongoError';
        student_model_1.Student.create.mockRejectedValueOnce(error);
        const response = yield (0, supertest_1.default)(app)
            .post("/students")
            .set("Authorization", "JWT " + accessToken)
            .send(student);
        expect(response.statusCode).toBe(500);
    }));
    // test("Test PUT /student/:id", async () => {
    //   const updatedStudent = { ...student, name: "Jane Doe 33" };
    //   const response = await request(app)
    //     .put(`/student/${student._id}`)
    //     .send(updatedStudent);
    //   expect(response.statusCode).toBe(200);
    //   expect(response.body.name).toBe(updatedStudent.name);
    // });
    // test("Test DELETE /student/:id", async () => {
    //   const response = await request(app).delete(`/student/${student._id}`);
    //   expect(response.statusCode).toBe(200);
    // });
});
//# sourceMappingURL=student.test.js.map