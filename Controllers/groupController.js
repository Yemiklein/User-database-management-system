const bcrypt = require("bcrypt");
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const model = require("../Models/groupModel");


// Assigning users to the variable User
const User = db.users;
const Group = db.groups;
const Role = db.roles;


