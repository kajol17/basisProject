module.exports = {
  relevantInfo: function (user) {
    return {
      firstName: user.firstName,
      lastName: user.lastName ? user.lastName : null,
      phoneNumber: user.phoneNumber,
      email: user.email,
    };
  },
};
