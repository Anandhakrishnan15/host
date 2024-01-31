const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userModule = new mongoose.Schema({
    username:{type:String,require:true},
    email:{type:String,require:true},
    phone:{type:String,require:true},
    password:{type:String,require:true},
    admit:{type:Boolean,default:false}
})
userModule.pre("save",async function(next){
    const user = this
    console.log(user);
    // check weather the passwor is modified or not 
    if(!user.isModified("password")){
        // if the passwor is not modified go to the next step
        (next)
    }
    //noe we will bcript the passwore
    try {
        const salt = await bcrypt.genSalt(10);
        const pwdhash = await bcrypt.hash(user.password,salt)//this will hash the pwd 
        user.password= pwdhash//assiging the hast pwd to the scema password
    } catch (error) {
        console.log("some erroe founf in pwd modification",error);
    }

})


const User = new mongoose.model("registers",userModule)
module.exports = User