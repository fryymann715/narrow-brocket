'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameTable('Tasks', 'Tasks')
    queryInterface.addColumn(
      'Tasks',
      'completed',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameTable('Tasks','Tasks' )
    queryInterface.removeColumn('Tasks', 'completed')
  }
};
