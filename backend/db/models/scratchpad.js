'use strict';
module.exports = (sequelize, DataTypes) => {
  const Scratchpad = sequelize.define('Scratchpad', {
    scratch: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Scratchpad.associate = function(models) {
    // associations can be defined here
    Scratchpad.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return Scratchpad;
};