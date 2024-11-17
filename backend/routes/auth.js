const express = require('express');
const router = express.Router();
const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Please enter all the required fields" });

    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: "Please enter a valid email" });
    if (password.length < 7) return res.status(400).json({ error: "Password should be at least 7 characters long" });

    try {
        const customerCheck = await Customer.findOne({ email });
        if (customerCheck) return res.status(400).json({ error: "Customer already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = new Customer({ name, email, password: hashedPassword });
        await newCustomer.save();

        return res.status(201).json({ message: "Customer Added" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Please enter all the required fields" });

    try {
        const customerCheck = await Customer.findOne({ email });
        if (!customerCheck) return res.status(400).json({ error: "Invalid email or password!" });

        if (password === 'google-auth') {
            // OAuth path: Return JWT without password verification
            const payload = { _id: customerCheck._id };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
            const user = { ...customerCheck._doc, password: undefined };
            return res.status(200).json({ token, user });
        }

        const passwordVerified = await bcrypt.compare(password, customerCheck.password);
        if (!passwordVerified) return res.status(400).json({ error: "Invalid email or password" });

        const payload = { _id: customerCheck._id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
        const user = { ...customerCheck._doc, password: undefined };
        return res.status(200).json({ token, user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
