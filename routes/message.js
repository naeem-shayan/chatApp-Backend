const router = require("express").Router();
const {
    createMessage,
    getMessages
} = require("../controllers/message");

router.post("/create", createMessage);
router.get("/all", getMessages);

module.exports = router;