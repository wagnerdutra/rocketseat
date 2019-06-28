module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // locals faz com que todos os templates "njk" enxergem a constante "user"
    res.locals.user = req.session.user
    return next()
  }
  return res.redirect('/')
}
