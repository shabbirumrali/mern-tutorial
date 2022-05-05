const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalsModel')
const User = require('../models/userModel')

// @desc get goals api
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.find({ user: req.user.id })
    res.status(200).json(goal)
})

// @desc post goals api
// @route POST /api/goals
// @access Private
const postGoals = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('please enter Text')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

// @desc update goals api
// @route PUT /api/goals/:id
// @access Private
const putGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal Id not found')
    }
    const user = await User.findById(req.user.id)
    // Check for user
    if(!user) {
        res.status(400)
        throw new Error("User not found")
    }

    // Make sure the login user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(401)

        throw new Error("User not authorized")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
})


// @desc DELETE goals api
// @route DELETE /api/goals/:id
// @access Private

const deleteGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)
    
    // Check for user
    if(!user) {
        res.status(400)
        throw new Error("User not found")
    }

    // Make sure the login user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(401)

        throw new Error("User not authorized")
    }
    await Goal.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals, 
    postGoals, 
    putGoals, 
    deleteGoals
}
