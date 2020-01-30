const express = require('express')
const router = express.Router()
const RestaruantController = require('../controllers/RestaurantController')

// router.get('/', RestaruantController.findAll)
router.get('/', (req, res) => res.render('./restaurants'))

module.exports = router