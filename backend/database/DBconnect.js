const mongoose = require("mongoose")
const env = require("dotenv")//imprt env
const { Long } = require("mongodb")

// now we have to create connection to the database 
// import dalabase url from env for the import  dotenv on the top 
const db = process.env.DB_URL

const ConnetDB = async ()=>{
    try {//create a connetion with awaite 

        await mongoose.connect(db,{
            writeConcern: {
                w: 'majority'
              }
        })
        console.log('datbase id connected');

        
    } catch (error) {
        console.log("connection to the data base failed", error);
    }
}

module.exports =ConnetDB;