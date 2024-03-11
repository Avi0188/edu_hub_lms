const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();


//model import
const { AdminModel } = require("../models/admin.model");

//middleware import
const { isAdminAuthenticated } = require("../middlewares/authMiddleware");

//get all admin data route
router.get("/all", async (req, res) => {
    const { filter } = req.query;
    try {
        let admins;
        if (filter) {
            admins = await AdminModel.find({ name: { $regex: filter, $options: "six" } });
        } else {
            admins = await AdminModel.find();
        }
        res.send({ message: "All admins data", admins });
    } catch (error) {
        res.status(400).send({ message: "Something went wrong" });
    }
});



//admin login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await AdminModel.find({ email });
        if (admin.length > 0) {
            if (admin[0].access == "false") {
                return res.send({ message: "Access Denied" });
            }
            bcrypt.compare(password, admin[0].password, (err, results) => {
                if (results) {
                    let token = jwt.sign(
                        { email, name: admin[0].name },
                        process.env.SECRET_KEY,
                        { expiresIn: "7d" }
                    );
                    res.send({
                        message: "Login Successful",
                        user: admin[0],
                        token,
                    });
                } else {
                    res.status(201).send({ message: "Wrong credentials" });
                }
            });
        } else {
            res.send({ message: "Wrong credentials" });
        }
    } catch (error) {
        res.status(404).send({ message: "Error" });
    }
});



module.exports = router;