const asyncHandler = require('express-aync-hadler')

// @desc get goals api
// @route GET /api/goals
// @access Private

const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({msg: "GET REQUEST"})
})

// @desc post goals api
// @route POST /api/goals
// @access Private

const postGoals = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text field')
    }
    res.status(200).json({msg: "Set Goal"})
})

// @desc update goals api
// @route POST /api/goals/:id
// @access Private

const putGoals = asyncHandler(async (req, res) => {
    res.status(200).json({msg: `PUT REQUEST ${req.params.id}`})
})

// @desc DELETE goals api
// @route DELETE /api/goals/:id
// @access Private

const deleteGoals = asyncHandler(async (req, res) => {
    res.status(200).json({msg: `DELETE REQUEST ${req.params.id}`})
})



module.exports = {
    getGoals,
    postGoals,
    putGoals,
    deleteGoals
}