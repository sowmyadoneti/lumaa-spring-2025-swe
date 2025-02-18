const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/db');
require('dotenv').config();

// To register a new user
const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    try {
        //Hashing password before entering it into the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, hashedPassword]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: "User already exists" });
    }
};

// To login the registered user and get JWT Token
const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (!user.rows.length) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    //comparing given password to the hashed password in the table
    const isValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isValid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};

module.exports = { register, login };
