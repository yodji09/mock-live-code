const router = require('express').Router()
const UserRouter = require('./user')
const FoodRouter = require('./food')

router.use('/user', UserRouter)
router.use('/food', FoodRouter)

module.exports =router