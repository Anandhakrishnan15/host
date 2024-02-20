const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userModule = new mongoose.Schema({
    username:{type:String,require:true},
    email:{type:String,require:true},
    phone:{type:String,require:true},
    password:{type:String,require:true},
    admit:{type:Boolean,default:false}
},
{
    timestamps:true,
})
userModule.pre("save",async function(next){
    const user = this
    // console.log("log or reg preveusemodule page ",user);
    // check weather the passwor is modified or not 
    if(!user.isModified("password")){
        // if the passwor is not modified go to the next step
        (next)
    }
    //noe we willbcrypt the passwore
    try {
        const salt = await bcrypt.genSalt(10);
        const pwdhash = await bcrypt.hash(user.password,salt)//this will hash the pwd 
        user.password= pwdhash//assiging the hast pwd to the scema password
    } catch (error) {
        console.log("some erroe founf in pwd modification",error);
    }

})

//make a compaire pasword function
userModule.methods.compairePwd = async function (password) {
    return bcrypt.compare(password,this.password)
}


//create a fnction to genrate a tokn wih the help of JWt 
//when this function is trigged or called it will return the token  
//jwt and create a token 
userModule.methods.genToke=async function(){
    try {
        return jwt.sign({
            userid:this.id.toString(),
            email:this.email,
            admit:this.admit
        },
        process.env.JWT_TOKEN)
    } catch (error) {
        console.log("error", error);
    }
}


const User = new mongoose.model("registers",userModule)
module.exports = User