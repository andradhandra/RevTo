'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model{}

   User.init ({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Please input correct email format"
        }
      }
    },
    password: DataTypes.STRING,
  }, {sequelize});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Review)
    User.belongsToMany(models.Restaurant, {through: models.Review})

  };
  return User;
};