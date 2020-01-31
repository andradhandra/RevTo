const { User, Restaurant, Review } = require('../models')
const { Op } = require('sequelize')
const showVerdict = require('../helpers/showVerdict')

class UserController {
  static login(req, res) {
    let login = req.body.login
    let password = req.body.password

    User.findOne({
      where: {
        [Op.or]: [ 
          { username: login },
          { email: login }    
        ]
      }
    })
      .then(user => {
        if(!user) res.redirect('/login?err=Wrong username')
        else {
          if(password != user.password) res.redirect('/login?err=Wrong Password')
          else {
            req.session.UserId = user.id
            req.session.username = user.username
            res.redirect('/?login=Login success') 
          }
        }
      })
      .catch(err => res.redirect(`/login?err=${err}`))
  }

  static register(req, res) {
    let newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    User.create(newUser)
      .then(() => res.redirect('/login?success=Register success, please login'))
      .catch(err => res.redirect(`/login?err=${err}`))
  }

  static findAllResto(req, res) {
    let success = req.query.success
    let UserId = req.session.UserId
    Restaurant.findAll({
      include: Review,
      order: [['id']]
    })
      .then(restaurants => res.render('./users', {restaurants, success, UserId}))
      .catch(err => res.send(err))
  }

  static findAllReview(req, res) {
    let success = req.query.success
    let id = req.params.id
    let UserId = req.session.UserId
    let err = req.query.err
    Review.findAll({
      where: {
        UserId: id
      },
      attributes: ['id', 'verdict', 'review'],
      include: Restaurant,
      order: [['id']]
    })
      .then(reviews => {
        res.render('./users/userReview.ejs', {reviews, success, UserId, showVerdict, err})
      })
      .catch(err => res.send(err))
  }

  static showReview(req, res) {
    let id = req.params.reviewId
    let UserId = req.session.UserId
    Review.findOne({
      where: {id},
      attributes: ['verdict'],
      include: Restaurant
    })
      .then(review => {
        res.render('./users/editReview.ejs', {review, UserId})
      })
      .catch(err => res.send(err))
  }

  static writeReview(req, res) {
    let restoId = req.params.restoId
    let UserId = req.session.UserId
    Restaurant.findByPk(restoId, {
      include: User
    }) 
      .then(resto => {
        res.render('./users/addReview.ejs', {resto, UserId})
      })
      .catch(err => res.send(err))
  }

  static addReview(req, res) {
    let newReview = {
      UserId: req.params.id,
      RestaurantId: req.params.restoId,
      review: req.body.review,
      verdict: req.body.verdict
    }
    Review.create(newReview)
      .then(() => res.redirect('/users?success=Review Resto added'))
      .catch(err => res.send(err))
  }


  static editReview(req, res) {
    let UserId = req.session.UserId
    let ReviewId = +req.params.reviewId
    let editReview = {
      review: req.body.review,
      verdict: Number(req.body.verdict)
    }
    Review.update(editReview, {
      where : {
        id: ReviewId
      }
    })
      .then(() => res.redirect(`/users/${UserId}/reviews?success=Edit review success`))
      .catch(err => res.redirect(`/users/${UserId}/reviews?err=${err}`))
  }

  static deleteReview(req, res) {
    let ReviewId = req.params.reviewId
    let id = req.params.id
    Review.destroy({
      where: {
        id: ReviewId
      }
    })
      .then(() => res.redirect(`/users/${id}/reviews?success=Delete review success`))
      .catch(err => res.send(err))
  }
  
}

module.exports = UserController
