const express = require("express");
const router = express.Router();

const {sendotp} = require("../controllers/sendOtp");

router.post("/api/v1/sendOtp",sendotp);




module.exports = router;