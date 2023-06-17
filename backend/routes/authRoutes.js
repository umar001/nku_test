const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

const {
    registerUserValidator,
    loginUserValidator,
    validate
} = require('../validators/userValidator')

router.post("/register", registerUserValidator, validate, authController.register)
router.post("/login", loginUserValidator, validate, authController.login)
module.exports = router;
