// Import necessary modules and dependencies
import Student from "../models/student_model"; // Hypothetical model
import { validationResult } from "express-validator";

class StudentController {
  async get(req, res) {
    try {
      const students = await Student.find(); // Fetch all students
      res.status(200).json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findById(id); // Fetch student by ID
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json(student);
    } catch (error) {
      console.error("Error fetching student by ID:", error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async post(req, res) {
    console.log('here')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, age, email } = req.body;
      const newStudent = new Student({ name, age, email }); // Create new student
      await newStudent.save(); // Save to database
      res.status(201).json(newStudent);
    } catch (error) {
      console.error("Error creating student:", error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async putById(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id } = req.params;
      const { name, age, email } = req.body;
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      student.name = name;
      await student.save(); // Update the student
      res.status(200).json(student);
    } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async deleteById(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findByIdAndDelete(id); // Delete by ID
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      console.error("Error deleting student:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new StudentController();