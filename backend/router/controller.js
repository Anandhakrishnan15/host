// importing the user module
const User = require ("../ModulesMongooes/UserModule")

const home=async(req,res)=>{
    try {
    res.status(200).send("hello..!!")        
    } catch (error) {
            res.status(200).send("error!")
        
    }
}

const register=async(req,res,next)=>{
    try {//lets make a register page
    // res.status(200).json("reg ...page  ") 

    const {username,email,phone, password} = req.body;
     //collecting all the data from the body
     //chech weather the email give is alerady thereor not if exist show erroe from the usermodule 
     const UserExist = await User.findOne({email})
     if(UserExist){
        // if user exist she error
        res.status(400).json({message:"email already exist"})
     }
     else{//if there is no user or email existing then creat a module 
        const userRegistered= await User.create({
            username,email,phone, password
        })
        res.status(499).json({
            message:"register completed",
            data:userRegistered
    })
     }
    } catch (error) {
            res.status(200).send("reg error ")
            next(error)
        
    }
}

const login=async(req,res)=>{
    try {
    res.status(200).send("login page ")        
    } catch (error) {
        res.status(200).send("loerror ")
        
    }
}




module.exports = {home,register,login}