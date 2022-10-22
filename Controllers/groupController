const bcrypt = require("bcrypt");
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");

const Group = db.groups

const regGroup = async function (req, res) {
    try {
      const userId = req.user.id;
      const { mavericks, peer, squad } = req.body;
      const data = { userId, mavericks, peer, squad };
      const group = await Group.create(data);
  
      if (group) {
        return res.status(200).json(group);
      } else {
        return res.status(404).json("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateGroup = async function (req, res) {
    try {
        const userId = req.user.id;
        const { mavericks, peer, squad } = req.body;
        const data = { mavericks, peer, squad };
        const group = await Group.update(data, { where: { userId: userId } });
        if (group) {
            return res.status(200).json("Group details updated Successfully") (group);
        } else {
            return res.status(404).json("Group not found");
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
            return res.status(200).json("Group deleted Successfully");
        } else {
            return res.status(404).json("Group not found");
        }
    } catch (error) {
        console.log(error);
    }
};

const getAllGroups = async function (req, res) {
    try {
        const groups = await Group.findAll();
        if (groups) {
            return res.status(200).json(groups);
        } else {
            return res.status(404).json("No group found");
        }
    } catch (error) {
        console.log(error);
    }
  };

















module.exports = {
    regGroup,
    updateGroup,
    deleteGroup,
    getAllGroups

}