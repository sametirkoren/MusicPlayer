require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const dbConfig = require('./config/dbConfig')
app.use(express.json())

const adminRoute = require('./routes/adminRoute')
const songRoute = require('./routes/songRoute')
const userRoute = require('./routes/userRoute')

app.use('/api/users', userRoute)
app.use('/api/songs', songRoute)
app.use('/api/admin', adminRoute)

const port = process.env.port || 5000

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(port, () => console.log(`Nodejs server started at port ${port}`))