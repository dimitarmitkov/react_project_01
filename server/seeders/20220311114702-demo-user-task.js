'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UserTasks', 
    [
      {
      userId: '1',
      taskId: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserTasks', null, {});
  }
};
