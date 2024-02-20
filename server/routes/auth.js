const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  SearchUsers,
  getUserById,
  uploadPost,
  getAllPost,
  updateProfile,
  checkUsernameValidity,
  getUserByName,
  getProfilePost,
  getSignature,
  setAvatarImage,
  addReaction,
  removeReaction,
  addConnection
} = require("../controllers/userController");


const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.post("/setavatar/:id", setAvatar);
router.post("/uploadPost/:id",uploadPost);
router.post("/updateProfile/:id",updateProfile);
router.post("/getSignature",getSignature);
router.post("/addConnection/:id",addConnection);
router.post("/setAvatarImage",setAvatarImage);
router.post("/addReaction",addReaction);
router.post("/removeReaction",removeReaction);
router.get("/logout/:id", logOut);
router.get("/SearchUsers/:id", SearchUsers);
router.get("/getUserById/:id",getUserById);
router.get("/getAllPost/:id",getAllPost);
router.get("/getAllUser/:id",getAllUsers);
router.get("/getProfilePost/:id",getProfilePost);
router.get("/checkUsernameValidity/:username/:checkUsername",checkUsernameValidity);
router.get("/getUserByName/:username",getUserByName);



module.exports = router;