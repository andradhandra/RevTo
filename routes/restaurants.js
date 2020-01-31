const express = require('express')
const router = express.Router()
const RestaruantController = require('../controllers/RestaurantController')

router.get('/', RestaruantController.findAll)

router.get('/:id/reviews', RestaruantController.findAllReviews)

module.exports = router