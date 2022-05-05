const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Name Field']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Email Field'],
        unqiue: true
    },
    password: {
        type: String,
        required: [true, 'Please Enter Password Field'],
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)