const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/', (req, res) => res.render('index.ejs'))

router.get('/login', (req, res) => res.render('login.ejs'))
// router.post('/login', UserController.login)

router.get('/register', (req, res) => res.render('register.ejs'))
// router.post('/register', UserUserController.register)


module.exports = router