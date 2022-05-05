const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const userRouter = require('./routes/userRoutes')
const connectDB = require('./config/db')

connectDB()

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', userRouter)

app.use(errorHandler)

app.listen(process.env.PORT, () => {console.log(`Port listing at ${process.env.PORT}`)})
