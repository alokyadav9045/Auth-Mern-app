const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', success: false });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: 'Signup successful', success: true });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = "Authentication failed. Email or password is incorrect.";
        
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(403).json({ message: errorMsg, success: false });
        }
        
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(200).json({
            message: 'Login successful',
            success: true,
            jwtToken,
            email,
            name: user.name,
            course: user.course,
            Jobrole: user.Jobrole,
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

module.exports = { signup, login };
