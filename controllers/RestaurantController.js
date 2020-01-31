const { User, Restaurant, Review } = require('../models')
const showVerdict = require('../helpers/showVerdict')

class RestaurantController {
  static findAll(req, res) {
    Restaurant.findAll({
      include: Review,
      order: [['id']]
    })
      .then(restaurants => res.render('./restaurants', {restaurants}))
      .catch(err => res.send(err))
  }

  static findAllReviews(req, res) {
    let RestaurantId = Number(req.params.id)
    Review.findAll({
      attributes: ['id', 'review', 'verdict'],
      where: {RestaurantId},
      include: Restaurant
    })
      .then(reviews => res.render('./restaurants/restoReviews.ejs', {reviews, showVerdict}))
      .catch(err => res.send(err))
  }
}

module.exports = RestaurantController
