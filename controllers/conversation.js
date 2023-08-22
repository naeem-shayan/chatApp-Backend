const router = require("express").Router();
const Conversation = require("../models/conversation");

const createConversation = async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      await newConversation.save();
      res.status(200).json("conversation saved successfully");
    } catch (error) {
      res.status(400).json(err);
    }
};

const getConversation = async (req, res) => {
  try {
    const conversation=await Conversation.find({
      members:{$in: [req.params.userId]}
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(400).json(error)
  }
};

exports.createConversation = createConversation;
exports.getConversation = getConversation;
