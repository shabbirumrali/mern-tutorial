const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalsModel')

// @desc get goals api
// @route GET /api/goals
// @access Private

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

// @desc post goals api
// @route POST /api/goals
// @access Private

const postGoals = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text field')
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})

// @desc update goals api
// @route POST /api/goals/:id
// @access Private

const putGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const updatedgoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedgoal)
})

// @desc DELETE goals api
// @route DELETE /api/goals/:id
// @access Private

const deleteGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    await Goal.remove()
    res.status(200).json({id: req.params.id})
})



module.exports = {
    getGoals,
    postGoals,
    putGoals,
    deleteGoals
}