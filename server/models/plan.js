'use strict';
module.exports = (sequelize, DataTypes) => {
  var Plan = sequelize.define('Plan', {
    name: DataTypes.STRING,
    price: DataTypes.NUMERIC
  });
 
  return Plan;
};