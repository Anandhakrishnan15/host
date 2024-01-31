require("dotenv").config();
const express = require('express');
const cors = require ("cors")
const mongoose = require("mongoose");
const ConnetDB = require("./database/DBconnect")//import data bse connecction

const router = require("./router/routers")

const app = express()
 app.use(cors())
 app.use(express.json())

 app.use("/",router)

const port = process.env.PORT
 ConnetDB().then(()=>{
    app.listen(port,()=>{//
        console.log(`server connected with port  ${port}`);
    })
 })



