const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @desc Register User
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => { 
    const { name, email, password } = req.body
    // Check all the Fields
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please Enter all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashPassword
    })
    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Login User
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    // Check for user Email
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
     else {
        res.status(400)
        throw new Error('Invalid login credential')
    }
})

// @desc Get User
// @route GET /api/users/me
// @access Private

const getMe = asyncHandler (async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})
// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
} 


module.exports = {
    registerUser, 
    loginUser, 
    getMe
}