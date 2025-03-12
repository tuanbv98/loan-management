const db = require("../models");
const User = db.user;

const auth = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.session.user.id);
    console.log('user: ', user);

    if (user.role != 'admin' || user.role != 'user') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
