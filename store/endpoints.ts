export const endpoints = {
  auth: {
    verifyMail: "auth/verifyEmail",
    otpVerification: "auth/otp-verification",
    createPassword: "auth/createPassword",
    personalDetails: "auth/personalDetails",
    login: "auth/login",
    verifyIdentity: "auth/verifyIdentity",
    createPin: "auth/createPin",
    getUserInfo: "auth/getUserInfo"
  },
  forgotPassword: {
    verifyMail: "auth/sendEmailForPasswordChange",
    verifyOtp: "auth/otp-verification",
    resetPassword: "auth/resetForgotPassword",
  },
  utils: {
    getCountries: "utils/getCountries",
  },
};
