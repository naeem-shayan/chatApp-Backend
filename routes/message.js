const router = require("express").Router();
const {
    createMessage,
    getMessages
} = require("../controllers/message");

router.post("/create", createMessage);
router.get("/:conversationId", getMessages);

module.exports = router;