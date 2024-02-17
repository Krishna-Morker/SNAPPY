const { response } = require("express");
const Messages = require("../models/messageModel");
const User = require("../models/userModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};


module.exports.allusers = async (req, res, next) => {
  try {
    const from=req.params.id;
    const users = await Messages.find({
      users: {
        $all: [from],
      },
    }).sort({ updatedAt: -1 });
    const uniqueSet = new Set();
    users.map((user)=>{
      uniqueSet.add(user.users[0]==from?user.users[1]:user.users[0]);
    })
    abc=[...uniqueSet];
    
    try {
      const ans = await Promise.all(
        abc.map(async (ab) => {
          return await User.find({ _id: ab }).select([
            "username",
            "avatarImage",
            "_id",
          ]);
        })
      );
      const ansArray = ans.flat();
      return res.json(ansArray);
      // 'ans' now contains an array of results from all the asynchronous User.find calls
    } catch (ex) {
      // Handle the exception
      next(ex);
    }
  } catch (ex) {
    next(ex);
  }
};