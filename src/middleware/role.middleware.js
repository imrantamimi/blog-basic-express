function isAdmin(res, req, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      error: 'Access denied: Admins only',
    });
  }
  next();
}

function isUser(res, req, next) {
  if (req.user.role !== 'user' && req.user.role !== 'admin') {
    return res.status(403).json({
      error: 'Access denied: Users only',
    });
  }
  next();
}

module.exports = {
  isAdmin,
  isUser,
};
