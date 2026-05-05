const jwt = require("jsonwebtoken");

const identifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log(req.cookies);

  if (!token) {
    return res.status(409).json({
      message: "Unauthorized Access",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
  console.log(decoded);

  req.user = decoded;

  next();
};

module.exports = identifyUser;
