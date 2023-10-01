
const userController = require('../controllers/userController')
const router = require('express').Router()
const auth = require('../middleware/auth')

router.post('/users/signup', userController.signup)
router.post('/users/login', userController.login)
router.get('/users/fetchUsers', auth,userController.fetchUsers)

module.exports = router

