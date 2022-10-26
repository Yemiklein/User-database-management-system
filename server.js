const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
 

const db = require('./config/db.config')
 const userRoutes = require ('./Routes/userRoutes')
 const groupRoutes = require ('./Routes/groupRoutes')
 


//setting up your port
const PORT = process.env.PORT || 4050

//assigning the variable app to express
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//synchronizing the database and forcing it to false so we dont lose data

db.sequelize.sync({ }).then(() => {
    console.log('Database connected 🎊')
   
});
    //routes for the user API
app.use('/api/users', userRoutes)
app.use('/groups', groupRoutes)

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on 🪐🚀 ${PORT}`))