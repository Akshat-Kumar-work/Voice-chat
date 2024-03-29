const express = require("express");
const router = express.Router();

const {sendotp} = require("../controllers/sendOtp");
const {verifyOtp} = require("../controllers/verifyOtp");
const {activateUser} = require('../controllers/acitvateUser');
const {checkAuthentication , refreshAuthentication} = require('../middlewares/auth');
const {logout} = require('../controllers/logout');
const {createRooms ,fetchRooms} = require('../controllers/createRooms')
const {fetchSingleRoom} = require("../controllers/fetchSingleRoom")

router.post("/sendOtp",sendotp);
router.post("/verifyOtp",verifyOtp);
router.post("/activateUser",checkAuthentication,activateUser);
router.post('/api/refresh',refreshAuthentication);
router.post('/api/logout',checkAuthentication,logout);
router.post('/api/createRoom',checkAuthentication,createRooms);
router.get('/api/fetchRooms',checkAuthentication,fetchRooms);
router.get(`/api/fetchSingleRoom/:roomId`,fetchSingleRoom)




module.exports = router;