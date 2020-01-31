function checkSession(req, res, next) {
  if(!req.session.UserId) res.redirect('/?err=Please login to access this feature')
  else next()
}

module.exports = checkSession