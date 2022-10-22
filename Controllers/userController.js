//importing modules
const bcrypt = require("bcrypt");
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const groupModel = require("../Models/groupModel");
const roleModel = require("../Models/roleModel");

// Assigning users to the variable User
const User = db.users;
const Group = db.groups;
const Role = db.roles;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    const data = {
      firstName,
      lastName,
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };
    //saving the user
    const user = await User.create(data);

    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      //res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      //send users details
      return res.status(201).json({ user });
    } else {
      return res.status(409).json({ msg: "Details are not correct" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({
        error: error.message,
        status: "failed",
        msg: "User registration failed",
      });
  }
};

//login authentication
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find a user by their email
    const user = await User.findOne({ email });

    //if user email is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      //if password is the same
      //generate token with the user's id and the secretKey in the env file

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
        console.log(token);
        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user

        //send user data
        return res.status(201).json({ msg: "login successful", user, token });
        //    return res.status(201).send(user);
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

// find a user by their id
const findUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Group,
          as: "Group", // load all pictures
        },
      ],
    });
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
  }
};





// find all users
const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users) {
      return res.status(200).send(users);
    } else {
      return res.status(404).send("No user found");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.destroy();
      return res.status(200).send("User deleted");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const regGroup = async function (req, res) {
  try {
    const userId = req.user.id;
    const { mavericks, peer, squad } = req.body;
    const data = { userId, mavericks, peer, squad };
    //saving the user
    const group = await Group.create(data);

    if (group) {
      return res.status(200).send(group);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const updateGroup = async function (req, res) {
    try {
        const userId = req.user.id;
        const { mavericks, peer, squad } = req.body;
        const data = { userId, mavericks, peer, squad };
        const group = await Group.update(data, { where: { userId: userId } });
        if (group) {
            return res.status(200).send(group);
        } else {
            return res.status(404).send("User not found");
        }
    } catch (error) {
        console.log(error);
    }
};


const deleteGroup = async function (req, res) {
    try {
        const userId = req.user.id;
        const group = await Group.findOne({ where: { userId: userId } });
        if (group) {
            await group.destroy();
            return res.status(200).send("Group deleted");
        } else {
            return res.status(404).send("Group not found");
        }
    } catch (error) {
        console.log(error);
    }
};


const getAllGroups = async function (req, res) {
    try {
        const groups = await Group.findAll();
        if (groups) {
            return res.status(200).send(groups);
        } else {
            return res.status(404).send("No group found");
        }
    } catch (error) {
        console.log(error);
    }
};




module.exports = {
  signup,
  login,
  findUser,
  deleteUser,
  findAllUsers,
  regGroup,
};
