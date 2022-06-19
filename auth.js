const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Register = require("./models/register");
router.use(express.json());
router.get("/", (req, res) => {
    res.send(`Hello world from auth.js`);
});

// creating a new user
router.post("/register", async(req, res) => {
    const { name, email, password, office_address } = req.body;

    try {
        const userExist = await Register.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already Exists!" });
        } else {
            const register = new Register({ name, email, password, office_address });

            register.password = bcrypt.hashSync(register.password, 12);

            await register.save();
            return res.status(201).json({ message: "User registered Successfully!" });
        }
    } catch (err) {
        console.log(err);
    }
});

// User login authentication

router.post("/login", async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Register.findOne({ email: email });

        if (user) {

            // if (password === user.password) {
            if (bcrypt.compareSync(password, user.password)) {
                const token = await user.generateAuthToken();
                console.log(token);

                res.cookie("Jwttoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });

                return res.status(200).json({
                    id: user._id,
                    accessToken: token,
                    message: "Login Successfully!"
                });
            } else {
                return res.status(422).json({ error: "Invalid password! please try again." });
            }
        } else {
            return res.status(422).json({
                error: "Invalid Email and Password Combination! Please try again!",
            });
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;