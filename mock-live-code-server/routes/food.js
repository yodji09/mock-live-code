const router = require('express').Router()
const ControllerFood = require('../controller/controllerfood')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/autorhization')

router.use(authentication)
router.get('/', ControllerFood.findAll)
router.post('/create', ControllerFood.create)
router.delete('/:id', authorization, ControllerFood.delete)


module.exports = router