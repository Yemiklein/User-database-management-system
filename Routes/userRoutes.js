//importing modules
const express = require('express')
const userController = require('../Controllers/userController')
const { signup, login, findUser, deleteUser, findAllUsers} = userController
// const userAuth = require('../Middlewares/userAuth')
const auth = require('../Middlewares/auth')



const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/signup',  signup)


router.post('/login', login )


router.get('/findUser/:id',  findUser) 


router.delete('/deleteUser/:id',  deleteUser)


router.get('/findAllUsers',  findAllUsers)


module.exports = router