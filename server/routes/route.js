const express = require("express");
const router = express.Router();

const {sendotp} = require("../controllers/sendOtp");
const {verifyOtp} = require("../controllers/verifyOtp");
const {activateUser} = require('../controllers/acitvateUser');
const {checkAuthentication} = require('../middlewares/auth')

router.post("/sendOtp",sendotp);
router.post("/verifyOtp",verifyOtp);
router.post("/activateUser",checkAuthentication,activateUser)




module.exports = router;