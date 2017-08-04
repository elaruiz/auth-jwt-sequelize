'use strict';
module.exports = (sequelize, DataTypes) =>{
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
  User.associate = (models) => {
    User.hasOne(models.Plan, {
      foreignKey: 'id'
    });
  };
  return User;
};