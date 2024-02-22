const express = require("express")
const router = express.Router()
const dataVArification = require('../midleravare/jwtVarifier')
const conversationController= require("./conversationController")
//make the router for the message api

router.route("/send/:id").post(dataVArification,conversationController.conversationcontoller)

module.exports = router
