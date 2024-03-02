// ??over here we are going to varifie the JWT token 
// and get the user data  frim the module or from the database..
const jwt = require("jsonwebtoken")
const User = require("../ModulesMongooes/UserModule")

const dataVArification = async(req,res,next)=>{
    const token = req.header("Authorization")
    //remove the bearer from the header Authendiction
    const jwttoken = token.replace("Bearer","").trim();
    // if a toke is not fround  the show a not Authrozide msg at the councolde
    if (!token){
        return res.status(402).json({message : "this page is not authorised yet "})
    }
    try {
        //now varifie the JWT token
        const isVarified = jwt.verify(jwttoken,process.env.JWT_TOKEN)
        //now the jwt token is ckecked and noe we want to get the datas of the user from the database
        const userInfor = await User.findOne({email:isVarified.email}).select({
            password:0
        })
        req.data = userInfor;
        req.token = token;
        req.userId = userInfor._id
        next()
    } catch (error) {
        // console.log({message: "token notvalified "},error);
        return res.status(401).json({ message: "Unanthorized,Token not provided" })
    }
}

module.exports = dataVArification
//now we will peovise this to he router and make a logic to expract the data feom the jwt