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
exports.StudentController = void 0;
// Import necessary modules and dependencies
const student_model_1 = require("../models/student.model");
const express_validator_1 = require("express-validator");
class StudentController {
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield student_model_1.Student.find(); // Fetch all students
                res.status(200).json(students);
            }
            catch (error) {
                console.error("Error fetching students:", error);
                res.status(500).json({ message: "Server error" });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const student = yield student_model_1.Student.findById(id); // Fetch student by ID
                if (!student) {
                    return res.status(404).json({ message: "Student not found" });
                }
                res.status(200).json(student);
            }
            catch (error) {
                console.error("Error fetching student by ID:", error);
                res.status(500).json({ message: "Server error" });
            }
        });
    }
    static createStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentData = req.body;
                // Create a new Student instance using the mongoose model
                const student = new student_model_1.Student(Object.assign({}, studentData));
                // Save the student to the database
                const savedStudent = yield student.save();
                res.status(201).json({
                    status: 'success',
                    data: savedStudent
                });
            }
            catch (error) {
                console.error('Error creating student:', error);
                res.status(500).json({
                    status: 'error',
                    message: 'Failed to create student',
                    error: error.message
                });
            }
        });
    }
    static putById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const { id } = req.params;
                const { name, age, email } = req.body;
                const student = yield student_model_1.Student.findById(id);
                if (!student) {
                    return res.status(404).json({ message: "Student not found" });
                }
                student.name = name;
                yield student.save(); // Update the student
                res.status(200).json(student);
            }
            catch (error) {
                console.error("Error updating student:", error);
                res.status(500).json({ message: "Server error" });
            }
        });
    }
    static deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const student = yield student_model_1.Student.findByIdAndDelete(id); // Delete by ID
                if (!student) {
                    return res.status(404).json({ message: "Student not found" });
                }
                res.status(200).json({ message: "Student deleted successfully" });
            }
            catch (error) {
                console.error("Error deleting student:", error);
                res.status(500).json({ message: "Server error" });
            }
        });
    }
}
exports.StudentController = StudentController;
//# sourceMappingURL=student_controller.js.map