const express = require("express");
const router = express.Router();

const {sendotp} = require("../controllers/sendOtp");
const {verifyOtp} = require("../controllers/verifyOtp");

router.post("/sendOtp",sendotp);
router.post("/verifyOtp",verifyOtp);





module.exports = router;