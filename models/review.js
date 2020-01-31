'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Review extends Model{}

   Review.init({
    UserId: DataTypes.INTEGER,
    RestaurantId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    verdict: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate: (review, options) => {
        if(!review.review) review.review = "Waiting to be reviewed..."
      },
      beforeBulkUpdate: (review, options) => {
        if(!review.review) review.review = "Waiting to be reviewed..."
      }
    }
  });
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User)
    Review.belongsTo(models.Restaurant)
  };
  return Review;
};