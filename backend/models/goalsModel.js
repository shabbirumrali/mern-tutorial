const mongoose = require('mongoose')
const User = require('../models/userModel')

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
            type: String,
            required: [true, 'Please enter all fields']
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Goal', goalSchema)