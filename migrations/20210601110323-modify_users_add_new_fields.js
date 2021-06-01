'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
    return Promise.all([
      await queryInterface.addColumn(
        'users', //table name
        'amount_gained', // new field name - amount gained from treasure collected
        {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      ),
      await queryInterface.addColumn(
        'users', // table name
        'bonus_gained', //new field name - bonuse gained by the user
        {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      ),
      
    ])

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return Promise.all([
      await queryInterface.removeColumn('users', 'amount_gained'),
      await queryInterface.removeColumn('users', 'bonuse_gained')
    ])
    

  }
};
