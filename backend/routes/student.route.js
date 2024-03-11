const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

// model import
const { StudentModel } = require("../models/student.model");

// middleware import
const { isAuthenticated } = require("../middlewares/authMiddleware");

// get all students data
router.get("/all", async (req, res) => {
  const { filter } = req.query;

  try {
    let students;
    if (filter) {
      students = await StudentModel.find({ class: +filter });
    } else {
      students = await StudentModel.find();
    }
    res.send({ message: "All students data", students });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
  }
});

// register new student
router.post("/register", isAuthenticated, async (req, res) => {
  const { name, email, password } = req.body.data;
  try {
    let user = await StudentModel.find({ email });
    if (user.length > 0) {
      return res.send({ msg: "User already registered" });
    }

    const secure_password = await bcrypt.hash(password, +process.env.Salt_rounds);

    const student = new StudentModel({
      name,
      email,
      class: req.body.data.class,
      password: secure_password,
    });

    await student.save();
    let newStudent = await StudentModel.find({ email });

    res.send({
      msg: "Student Registered Successfully",
      student: newStudent[0],
    });
  } catch (err) {
    res.status(404).send({ msg: "Student Registration failed" });
  }
});

// student login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await StudentModel.find({ email });
    if (student.length > 0) {
      if (student[0].access == "false") {
        return res.send({ message: "Access Denied" });
      }
      const results = await bcrypt.compare(password, student[0].password);
      if (results) {
        let token = jwt.sign(
          { email, name: student[0].name },
          process.env.SECRET_KEY,
          { expiresIn: "7d" }
        );
        res.send({
          message: "Login Successful",
          user: student[0],
          token,
        });
      } else {
        res.status(201).send({ message: "Wrong Password" });
      }
    } else {
      res.send({ message: "Wrong EmailID" });
    }
  } catch (error) {
    res.status(404).send({ message: "Error" });
  }
});

// edit student
router.patch("/:studentId", isAuthenticated, async (req, res) => {
  const { studentId } = req.params;
  const payload = req.body.data;
  try {
    const student = await StudentModel.findByIdAndUpdate(
      { _id: studentId },
      payload
    );
    const updatedStudent = await StudentModel.find({ _id: studentId });
    res
      .status(200)
      .send({ msg: "Updated Student", student: updatedStudent[0] });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

// delete student
router.delete("/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await StudentModel.findByIdAndDelete({ _id: studentId });
    res.status(200).send({ msg: "Deleted Student" });
  } catch (error) {
    res.status(400).send({ msg: "Error" });
  }
});

module.exports = router;
