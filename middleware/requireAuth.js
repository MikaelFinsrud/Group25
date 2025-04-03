function requireAuth(req, res, next){
    if (!req.session.username) {
      return res.status(401).json({ 
        success: false,
        message: "Not authenticated" 
      });
    }
    next();
}

module.exports = requireAuth;
  