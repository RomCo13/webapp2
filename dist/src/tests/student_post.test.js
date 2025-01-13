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
const student_post_model_1 = require("../models/student_post.model");
let app;
let accessToken;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    const user = {
        email: "test@test.com",
        password: "12345678"
    };
    yield (0, supertest_1.default)(app).post("/auth/register").send(user);
    const response = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
    accessToken = response.body.accessToken;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("Student Post tests", () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });
    test("Create post without auth should fail", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/studentpost")
            .send({ title: "Test Post", content: "Test Content" });
        expect(response.statusCode).toBe(401);
    }));
    test("Create post with auth should succeed", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock StudentPost.create
        const mockPost = {
            title: "Test Post",
            content: "Test Content",
            _id: new mongoose_1.default.Types.ObjectId(),
            save: jest.fn().mockResolvedValue(true)
        };
        student_post_model_1.StudentPost.create.mockResolvedValueOnce(mockPost);
        const response = yield (0, supertest_1.default)(app)
            .post("/studentpost")
            .set("Authorization", "JWT " + accessToken)
            .send({ title: "Test Post", content: "Test Content" });
        expect(response.statusCode).toBe(201);
    }));
});
//# sourceMappingURL=student_post.test.js.map