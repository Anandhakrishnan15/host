const express = require("express")
const router = express.Router()
const controller = require("./controller")
const validater = require('../midleravare/AuthValidateMiddleware')
const {registerValidatioin,loginVAlidater} = require('../zod_validater/zod_register')




// home page 
router.route("/chat").get(controller.home)

// reggister page 
router.route("/register").post(validater(registerValidatioin),controller.register)


// login page
router.route("/login").post(validater(loginVAlidater),controller.login)


module.exports = router