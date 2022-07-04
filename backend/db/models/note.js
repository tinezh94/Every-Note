'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    notebookId: DataTypes.INTEGER
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.Notebook, {foreignKey: 'notebookId', onDelete: 'CASCADE'});
    Note.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE'});
  };
  return Note;
};
