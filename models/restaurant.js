'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Restaurant extends Model{}

  Restaurant.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {sequelize});
  Restaurant.associate = function(models) {
    // associations can be defined here
    Restaurant.hasMany(models.Review)
    Restaurant.belongsToMany(models.User, {through: models.Review})
  };
  return restaurant;
};