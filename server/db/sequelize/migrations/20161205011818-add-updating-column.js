'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Tasks',
      'updating',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Tasks', 'updating')
  }
};
