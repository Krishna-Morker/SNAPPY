const { timeStamp } = require("console");
const mongoose = require("mongoose");

const postSchema=new mongoose.Schema({
    user : {type:mongoose.Schema.Types.ObjectId, ref:"User", required:'true'},
    description : {type:String},
    images : [{type:String}],
    reactions: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        type: { type: String, enum: ['Like', 'Heart', 'Celebration', 'Mind_Blowing'], required: true },
      }],
    comments : [{
        user : { type:mongoose.Schema.Types.ObjectId, ref:"User", required:true },
        comment : { type:String, required:true },
        timeStamp : { type: Date, default: Date.now },
    }],
    },
    {
        timestamps:true
    }    
);
module.exports = mongoose.model("Post", postSchema);