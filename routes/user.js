const router = require("express").Router();
const {getUsers} = require("../controllers/user");

router.get("/all", getUsers);

module.exports=router;