const User = require("../models/user");

const getUsers=async(req,res)=>{
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getUsers=getUsers;