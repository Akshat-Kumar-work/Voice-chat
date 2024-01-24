
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const allEndPoints = {
    SEND_OTP: BASE_URL+"/sendOtp",
    VERIFY_OTP: BASE_URL+"/verifyOtp",
    ACTIVATE_USER: BASE_URL+"/activateUser"
}