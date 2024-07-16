// importing the user module
// const { response } = require("express")
const User = require("../ModulesMongooes/UserModule")
const Conversation = require("../ModulesMongooes/converasation_module")

const home = async (req, res) => {
    try {
        res.status(200).send("hello..!!")
    } catch (error) {
        res.status(400).send("error!")

    }
}

const register = async (req, res) => {
    try {//lets make a register page
        // res.status(200).json("reg ...page  ") 

        const { username, email, phone, password } = req.body;
        //collecting all the data from the body
        //chech weather the email give is alerady thereor not if exist show erroe from the usermodule 
        const UserExist = await User.findOne({email })
        // const phoneExist = await User.findOne({phone})
        if (UserExist) {
            // if user exist she error
            res.status(400).json({ message: "email already exist" })
        }

        //if there is no user or email existing then creat a module 
        else{  const userRegistered = await User.create({
                username, email, phone, password
            })
            res.status(200).json({
                message: "register completed",
                data: userRegistered,
                userId: userRegistered._id.toString(),
                token: await userRegistered.genToke(),
            })}
    } catch (error) {
        res.status(400)
        console.log("error reg found ",error);

    }
}

const login = async (req, res) => {
    try {
        // res.status(200).send("login page ")    
        const { email, password } = req.body;
        const isemailThere = await User.findOne({ email:email })
        if (!isemailThere) {
            res.status(400).json({ message: "email not there try again" })
          
            // console.log("password comparsion", pwdCompair);
        }
        const pwdCompair = await isemailThere.compairePwd(password);
        if (pwdCompair) {
            res.status(200).json({
                // isUser: isemailThere,
                message: "login successful",
                token: await isemailThere.genToke(),
                userId: isemailThere._id.toString()
            });
        }
        else {
            res.status(401).json({ message: "inValide email or password" })
        }
    }
    catch (error) {
        res.status(400)
        console.log("error found ",error);

    }
}

const USER = async (req, res) => {
    const userId = req.data._id
    try {
        const findUser = await User.findById(userId).select({
            //this select method will make sur that the passwor is not show while the 
            password: 0
        })
        res.status(200).json(findUser)
        // console.log('find users',findUser);

    } catch (error) {
        res.status(403).send("user id error ", error) 
    }
}

const allUsers = async (req, res) => {
    try {
       const senderId = req.data._id
        //get all the data from the database and make suer that the passwor and other imp data are not shown
        const getAllUssers = await User.find({_id:{$ne:senderId}}).select({ password: 0 })//to hide the password
        res.status(200).json(getAllUssers)
    } catch (error) {
        res.status(403).send("error to find all users ", error)

    }
}

const colletctData = async (req, res, next) => {
    try {
        const userData = req.data
        res.status(200)
            .json({ message: userData })
        next()
    } catch (error) {
        res.status(400)
            .send({ message: "page not found" })
        console.log(error);
    }

}
const getAllParticipationIds = async (req, res) => {
    try {
      const userId = req.data._id;
      const limit = parseInt(req.query._limit) || 10;
    //   console.log('getallparticiId',userId);
  
      const conversations = await Conversation.find(
        { particepitaion: { $in: [userId] } },
        { particepitaion: { $elemMatch: { $ne: userId } } }
      );
      const participationIds = conversations.map(conversation => conversation.particepitaion[0]);
      const totalFriendsCount = await User.countDocuments({ _id: { $in: participationIds } });
      const getFriends = await User.find({_id :{$in :participationIds }},{password:0 }).limit(limit);
      res.status(200).json({ 
        data:getFriends,
        message: "All friends fetched successfully",
        totalCount: totalFriendsCount,
        limit: limit,
        totalPages: Math.ceil(totalFriendsCount / limit)  // to calculate total pages

      });
    } catch (error) {
      console.log("error at get all participation ids controller check it ", error.message);
      res.status(404).json({ message: "internal server error " });
    }
  };


module.exports = { home, register, login, USER, allUsers, colletctData ,getAllParticipationIds}