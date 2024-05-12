const express = require("express");
const userProfileController = require("../controller/user.controller");
const router = express.Router();


router.post("/createUserProfile", userProfileController.createUserProfile);
router.get("/getListOfUserProfile", userProfileController.getListOfUserProfile);
router.get("/getUserProfile/:zacrac", userProfileController.getUserProfile);
router.put("/updateUserProfile/:id", userProfileController.updateUserProfile);
router.delete("/deleteUserProfile/:zacrac", userProfileController.deleteUserProfile);


module.exports = router;