const express = require("express")
const router = express.Router()
const controller = require("./controller")
const validater = require('../midleravare/AuthValidateMiddleware')
const {registerValidatioin,loginVAlidater} = require('../zod_validater/zod_register')
const dataVArification = require("../midleravare/jwtVarifier")





// home page 
router.route("/chat").get(controller.home)

// reggister page 
router.route("/register").post(validater(registerValidatioin),controller.register)


// login page
router.route("/login").post(validater(loginVAlidater),controller.login)

//find use bt paramerte id
router.route("/user").get(dataVArification,controller.USER)

//to get all userss data drom the data base
router.route("/getusers").get(dataVArification,controller.allUsers)

//user fetch data 
router.route("/api/data").get(dataVArification,controller.colletctData)

router.route("/getfriends").get(dataVArification,controller.getAllParticipationIds)



module.exports = router