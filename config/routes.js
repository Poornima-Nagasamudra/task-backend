const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/userCtrl')
const taskController = require('../app/controllers/taskCtrl')
const authenticateUser = require('../app/middlewares/authenticateUser')

//user
router.post('/api/register', userController.register)
router.post('/api/login', userController.login)
router.get('/api/account', authenticateUser, userController.account)

//task
router.get('/users/task', authenticateUser, taskController.list)
router.post('/users/task', authenticateUser, taskController.create)
router.get('/users/task/:id', authenticateUser,  taskController.show)
router.put('/users/task/:id', authenticateUser,  taskController.update)
router.delete('/users/task/:id', authenticateUser, taskController.destroy)



module.exports = router 