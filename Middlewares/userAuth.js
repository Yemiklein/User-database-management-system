//importing modules
const express = require("express");
const db = require("../config/db.config");
//Assigning db.users to User variable
 const User = db.users;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
 const saveUser = async (req, res, next) => {
 //search the database to see if user exist
 try {
   const username = await User.findOne({
     where: {
       userName: req.body.userName,
     },
   });
   //if username exist in the database respond with a status of 409
   if (username) {
     return res.json(409).json("username already taken");
   }

   //checking if email already exist
   const authUser = await User.findOne({
     where: {
       email: req.body.email,
     },
   });

   //if email exist in the database respond with a status of 409
   if (!authUser) {
     return res.json(401).json({msg:"Authentication failed"});
   }
     req.user=authUser
   next();
 } catch (error) {
   console.log(error);
 }
};


//exporting module
 module.exports = {
 saveUser,
};

