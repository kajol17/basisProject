module.exports = {
  validateInfo: function (user, res) {
    if (user.phoneNumber) {
      validatePhoneNumber(user.phoneNumber, res);
    } else {
      return res.status(400).json({ message: "Phone number is required!" });
    }

    if (user.email) {
      validateEmail(user.email, res);
    } else {
      return res.status(400).json({ message: "Email is required!" });
    }

    if (user.password) {
      validatePassword(user.password, res);
    } else {
      return res.status(400).json({ message: "Password is required!" });
    }

    if (!user.firstName) {
      return res.status(400).json({ message: "First Name is required!" });
    }
  },

  relevantInfo: function (user) {
    return {
      firstName: user.firstName,
      lastName: user.lastName ? user.lastName : null,
      phoneNumber: user.phoneNumber,
      email: user.email,
    };
  },
};

function validatePhoneNumber(number, res) {
  if (number.toString().length != 10) {
    return res
      .status(403)
      .json({ message: "Phone number should be of 10 digits!" });
  }
}

function validateEmail(email, res) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!filter.test(email)) {
    return res.status(403).json({ message: "Invalid email!" });
  }
}

function validatePassword(password, res) {
  if (password.length < 8) {
    return res
      .status(403)
      .json({ message: "Password should be greater than 8 in length!" });
  }
}
