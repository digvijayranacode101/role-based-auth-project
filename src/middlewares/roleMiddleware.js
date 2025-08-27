const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.userId || !roles.includes(req.userRole)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
}

module.exports = authorizedRoles;