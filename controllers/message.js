const Message = require("../models/message");

// save message

const createMessage=async(req,res)=>{
    const newMessage = new Message(req.body);
    try {
        await newMessage.save();
        res.status(200).json("message has been saved succfully");
    } catch (error) {
        res.status(400).json(error);
    }
}

// get messages in conversation

const getMessages=async(req,res)=>{
    try {
        const messages= await Message.find({
            conversationId:req.params.conversationId
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.createMessage=createMessage;
exports.getMessages=getMessages;
