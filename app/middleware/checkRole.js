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

module.exports = checkRole;