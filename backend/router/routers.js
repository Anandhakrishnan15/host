const express = require("express")
const router = express.Router()
const controller = require("./controller")

// home page 
router.route("/chat").get(controller.home)

// reggister page 
router.route("/register").post(controller.register)


// login page
router.route("/login").get(controller.login)


module.exports = router