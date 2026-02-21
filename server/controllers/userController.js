const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if (user) {
            return res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data'});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user.id,
                name:user.name,
                email: user.email,
                token: generateToken(user._id)
            });        
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {

    try {
        const users = await User.find({});

        // Alternate way
        //const users = await User.find({}).select('_id name email');

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'Users not found' });
        }

        const userList = users.map(user => ({
            _id: user.id,
            name: user.name,
            email: user.email
        }));

        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = {
    registerUser,
    loginUser,
    getUsers
};