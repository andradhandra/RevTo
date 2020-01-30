const express = require('express')
const app = express()
const session = require('express-session')
const PORT = 3000

//view engine
app.set('view engine', 'ejs')

//body parser
app.use(express.urlencoded({ extended: false}))

//static
app.use(express.static(__dirname + '/public'))

//session
app.use(session({
  secret: 'REView resTO',
  resave: false,
  saveUninitialized: true
}))

//router
const router = require('./routes')
const restaurants = require('./routes/restaurants')

//routing
app.use('/', router)
app.use('/restaurants', restaurants)

//listener
app.listen(PORT, () => console.log("I LOVE YOU", PORT))