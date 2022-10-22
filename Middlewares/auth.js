const  express = require("express");
const  jwt = require ("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const db = require("../config/db.config");

const User=db.users;
const user_Auth = async function auth(
  req,
  res,
  next
) {
  try {
   

    const auth =
       req.headers.authorization;
    if (!auth) {
      res.status(401).json({
        Error: "Kindly login from the login page",
      });
    }
    const token = auth?.slice(7, auth.length);
    //const token = auth;
    let verified = jwt.verify(token, secret);

    if (!verified) {
      return res.status(401).json({
        Error: "Verification failed, access denied, kindly check your login details ",
      });
    }
    const { id } = verified;
    

    const user = await User.findOne({ id });;
    
    if (!user) {
      return res.status(404).json({
        Error: "User verification failed",
      });
    }

    req.user = verified;
    
    next();
  } catch (error) {
     console.log(error);

    res.status(403).json({
      error,
      Error: "You are not logged in, kindly login",
    });
  }
}

module.exports = {
    user_Auth,
   };