const express = require("express");
const router = express.Router();

const {sendotp} = require("../controllers/sendOtp");

router.post("/sendOtp",sendotp);




module.exports = router;