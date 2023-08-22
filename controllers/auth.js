const User = require("../models/user");

const signin = async (req,res)=>{
    console.log("login routes", req.body)
    try {
        const existingUser= await User.findOne({email: req.body.email});
        if(existingUser) {
            res.status(200).json(existingUser);
        }
        else{
            res.status(400).json("User does not exist");
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.signin=signin;