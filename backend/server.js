const express = require('express')
const router = require('./routes/goalRoutes')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')

const app = express()

// use middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', router)

app.use(errorHandler)


app.listen(process.env.PORT, () => console.log(`Port Listing at ${process.env.PORT}`))