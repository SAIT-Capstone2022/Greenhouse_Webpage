const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const createUserData = async (userInput) => {
    const uer = await userWithEncodePassword(userInput);
    return user.save();
};
    
const userWithEncodePassword = async({
    username,
    password,
    phonenumber,
    firstname,
    lastname,
}) => {

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        username,
        password: hashedPassword,
        phonenumber,
        firstname,
        lastname,
    });
    return user;
};

const errorGenerator = (message, statusCode = 500) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
};

const signUp = async (req, res, next) =>{
    try{
        const{username} = req.body;
        const uer = await User.findOne({username});
        if(user) errorGenerator("Username already exist.", 404);
    } catch(err) {
        next(err);
    }
};

const createToken = (userId) => {
    const token = jwt.sign({ _id: userId.toString() }, SECRET_KEY); 
    return token;
  };
  
  const signIn = async (req, res, next) => {
    try {
      const { username = null, password = null } = req.body; 
      if (!username || !password) errorGenerator("Invalid inputs", 400); 
  
      const user = await User.findOne({ username }); 
  
      if (!user) errorGenerator("User not found", 404); 
  
      const passwordCheck = await bcrypt.compare(password, user.password); 
  
      if (!passwordCheck) errorGenerator("Wrong password", 404); 
  
      const token = createToken(user._id); 
  
      res.status(201).json({ message: "WOW", token }); 
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = { signUp, signIn };