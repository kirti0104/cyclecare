
const responseMessages = {
  msgType: {
    successStatus: true,
    failedStatus: false,
  },
  msg: {
    userCreated: "User registered successfully",
    forgotPassword:
      "A reset link has been sent to your email. Please check your inbox",
    resetPassword:
      "Your password has been reset successfully. Please log in with your new password.",
    changePassword:
      "Your password has been reset successfully. Please log in with your new password.",
    unAuthorised: "Authorization token missing or invalid",
    newToken: "New access token granted",
  },
  msgCode: {
    successCode: 200, // To be used when no new record is inserted but to display success message
    newResourceCreated: 201, // To be used when a new record is inserted
    unAuthorised: 401, //to be used when token is expired
  },
};

export default responseMessages;
