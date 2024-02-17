const { addMessage, getMessages , allusers } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.get("/allusers/:id",allusers);

module.exports = router;
