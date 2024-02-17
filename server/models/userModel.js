const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: true,
  },
  avatarImage: {
    type: String,
    default: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1707052827/zupx5ylgkrtq33lzzkma.png`,
  },
  // coverImage : {
  //   type:String,
  //   default:'./Screenshot 2023-12-29 at 5.14.59 PM.png',
  // },
  aboutMe : {
    type:String,
  },
  connections : [{
     type:mongoose.Schema.Types.ObjectId, ref:'User',
 }],
  posts : [{
      type:mongoose.Schema.Types.ObjectId, ref:'Post',required:true,
  }],
  headline : {
    type : String,
  },
  country : {
    type : String,
  },
  city : {
    type : String,
  }, 
  company : {
    type : String,
  },
  industry : {
    type : String,
  },
  website : {
    type : String,
  },
  skills : {
    type : String,
  },
  college : {
    type : String,
  },
  // education : [{
  //     school:{type:String, required:true},
  //     degree:{type:String, required:true},
  //     startDate:{type:Date,required:true},
  //     endDate:{type:Date,required:true},
  //     grade:{type:String},
  //     description:{type:String},
  //     image:{type:String,default:'./Screenshot 2023-12-29 at 5.14.59 PM.png',}
  // }],
  // experience : [{
  //     company:{type:String, required:true},
  //     role:{type:String, required:true},
  //     startDate:{type:Date,required:true},
  //     endDate:{type:Date,required:true},
  //     description:{type:String},
  //     skills:[{type:String}],
  //     location:{type:String},
  //     image:{type:String,default:'./Screenshot 2023-12-29 at 5.14.59 PM.png',}
  // }],
  // languages : [{
  //     type:String,
  // }],
  // skills : [{
  //     skillsName:{type: String,required:true},
  //     endorsements:[{type:mongoose.Schema.Types.ObjectId, ref:'User' , required:true}],
  // }],
  });

module.exports = mongoose.model("User", userSchema);
