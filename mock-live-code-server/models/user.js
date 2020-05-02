'use strict';
const {generatePassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    hooks : {
      beforeCreate : (user)=>{
        user.password = generatePassword(user.password)
      }
    },
    modelName : "User"
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Food)
  };
  return User;
};