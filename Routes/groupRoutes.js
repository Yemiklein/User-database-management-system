const express = require('express')
const groupController = require('../Controllers/groupController');
const {  deleteGroup, updateGroup, regGroup} = groupController
const auth = require('../Middlewares/auth')
const router = express.Router()


//Routes for the group API
// router.post('/create-group', auth.user_Auth, createGroup)
// router.get('/find-group/:id', auth.user_Auth, findGroup)
// router.get('/find-all-groups', auth.user_Auth, findAllGroups)
router.delete('/delete-group/:id', auth.user_Auth, deleteGroup)
router.put('/update-group/:id', auth.user_Auth, updateGroup)
router.post('/add-group',auth.user_Auth, regGroup)


module.exports = router