require('dotenv').config()
const express = require('express')

const app = express()
const dbConfig = require('./config/dbConfig')
app.use(express.json())

const userRoute = require('./routes/userRoute')
app.use('/api/users', userRoute)

const port = 5000

app.listen(port, () => console.log(`Nodejs server started at port ${port}`))