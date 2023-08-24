const Message = require("../models/message");

// save message

const createMessage=async(req,res)=>{
    const newMessage = new Message(req.body);
    console.log("first", req.body);
    try {
        await newMessage.save();
        res.status(200).json("message has been saved succfully");
    } catch (error) {
        res.status(400).json(error);
    }
}

// get messages in conversation

const getMessages=async(req,res)=>{
    console.log(req.query.sender);
    console.log("re", req.query.receiver);
    try {
        const messages = await Message.find({
            $or: [
                {
                  $and: [{ sender: req.query.sender }, { receiver: req.query.receiver }],
                },
                {
                  $and: [{ sender: req.query.receiver }, { receiver: req.query.sender }],
                },
              ],
          });
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.createMessage=createMessage;
exports.getMessages=getMessages;
