const router = require("express").Router()

const controller = require('../controllers/UserController')

router.post('/user/login', controller.login);

module.exports = router;