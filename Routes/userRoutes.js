//importing modules
const express = require('express')
const userController = require('../Controllers/userController')
const { signup, login, findUser, deleteUser, findAllUsers, regGroup} = userController
// const userAuth = require('../Middlewares/userAuth')
const auth = require('../Middlewares/auth')


const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', signup)

//login route
router.post('/login', login )

//getUser route
router.get('/findUser/:id', findUser) 

//deleteUser route
router.delete('/deleteUser/:id', deleteUser)

//findAllUsers route
router.get('/findAllUsers', findAllUsers)


router.post('/add-group',auth.user_Auth, regGroup)

module.exports = router