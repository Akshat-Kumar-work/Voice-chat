
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const allEndPoints = {
    SEND_OTP: BASE_URL+"/sendOtp",
    VERIFY_OTP: BASE_URL+"/verifyOtp",
    ACTIVATE_USER: BASE_URL+"/activateUser",
    LOGOUT_USER:BASE_URL+"/api/logout",
    CREATE_ROOM: BASE_URL+"/api/createRoom",
    FETCH_ROOMS:BASE_URL+"/api/fetchRooms",
}