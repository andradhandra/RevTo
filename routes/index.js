const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/', (req, res) => {
  let login = req.query.login
  let logout = req.query.logout
  let err = req.query.err
  let status = false
  if(req.session.UserId) status = true
  console.log(req.session)
  res.render('index.ejs', {status, login, logout, err})
})

router.get('/login', (req, res) => {
  let err = req.query.err
  let success = req.query.success
  res.render('login.ejs', {err, success})
})
router.post('/login', UserController.login)

router.get('/register', (req, res) => res.render('register.ejs'))
router.post('/register', UserController.register)

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) res.send(err)
    else res.redirect('/?logout=Logout sucess')
  })
})


module.exports = router