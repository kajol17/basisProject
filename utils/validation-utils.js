const jwt = require("jsonwebtoken");

module.exports = {
  validateRequest: function (req, res) {
    appendToken(req, res);
    verifyToken(req, res);
  },

  validateWritePermission: function (req, res) {
    var phoneNumber = req.user.phoneNumber;
    if (isOdd(phoneNumber)) {
      return res
        .status(403)
        .json({ message: "User Does not have write permission!" });
    }
  },
};

// Expected format of token
//Authorization: Bearer <jwt_token>
function appendToken(req, res) {
  const header = req.get("Authorization");
  if (typeof header !== "undefined") {
    const headerSplit = header.split(" ");
    const token = headerSplit[1];
    req.token = token;
  } else {
    return res.status(500).json({ message: "User not logged in! " });
  }
}

function verifyToken(req, res) {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      return res.status(403).json({ message: "User session expired!" });
    } else {
      req.user = data.user;
    }
  });
}

function isEven(number) {
  return number % 2 == 0;
}

function isOdd(number) {
  return !isEven(number);
}
