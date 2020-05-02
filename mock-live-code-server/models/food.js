'use strict';
module.exports = (sequelize, DataTypes) => {
  class Food extends sequelize.Sequelize.Model{}

  Food.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    },
    price: {
      type : DataTypes.INTEGER,
      validate : {
        notEmpty : true
      }
    },
    ingredients: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    },
    tag: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    },
    UserId : {
      type : DataTypes.INTEGER,
      references : {
        model : "Users",
        key : "id"
      },
      onDelete : "cascade",
      onUpdate : "cascade"
    }
  }, {
    sequelize,
    modelName : "Food"
  });
  Food.associate = function(models) {
    Food.belongsTo(models.User)
  };
  return Food;
};