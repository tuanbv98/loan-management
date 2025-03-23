const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const hasRole = roles.includes(req.session.user.role);
    if (!hasRole) {
      return res.status(403).json({ message: 'Access denied. Insufficient role.' });
    }
    next();
  };
};

const verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token,
             config.secret,
             (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.id;
              next();
             });
};

const authJwt = {
  verifyToken,
  checkRole,
};

module.exports = authJwt;

// module.exports = checkRole;