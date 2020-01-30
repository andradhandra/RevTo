'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Review extends Model{}

   Review.init({
    UserId: DataTypes.INTEGER,
    RestaurantId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    verdict: DataTypes.INTEGER
  }, {sequelize});
  review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User)
    Review.belongsTo(models.Restaurant)
  };
  return review;
};