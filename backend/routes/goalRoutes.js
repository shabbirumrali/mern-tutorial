const express = require('express')
const {getGoals, postGoals, putGoals, deleteGoals} = require('../controllers/goalController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route("/").get(protect, getGoals).post(protect, postGoals)
router.route("/:id").put(protect, putGoals).delete(protect, deleteGoals)

module.exports = router