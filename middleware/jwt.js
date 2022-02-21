const jwt = require("jsonwebtoken");

const config = process.env;

module.exports = verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(" ")[1] : null;
  console.log("Token is : ", token);

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log("decoded from token : ", decoded);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token", err);
  }
  return next();
};
