const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const checkSession = require('../middlewares/checkSession')

router.get('/', checkSession, UserController.findAllResto)

router.get('/:id/:restoId/writeReview', checkSession, UserController.writeReview)
router.post('/:id/:restoId/writeReview', checkSession, UserController.addReview)

router.get('/:id/reviews', checkSession, UserController.findAllReview) 

router.get('/:id/reviews/:reviewId/editReview', checkSession, UserController.showReview)
router.post('/:id/reviews/:reviewId/editReview', checkSession, UserController.editReview)

router.get('/:id/reviews/:reviewId/deleteReview', checkSession, UserController.deleteReview)

module.exports = router