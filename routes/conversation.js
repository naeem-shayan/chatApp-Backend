const router = require("express").Router();
const {
  createConversation,
  getConversation,
} = require("../controllers/conversation");

router.post("/create", createConversation);
router.get("/:userId", getConversation);

module.exports = router;
