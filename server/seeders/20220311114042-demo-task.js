'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tasks', 
    [{
      taskName: 'Data Solution Meeting',
      taskType: 'meeting',
      taskProgress: 'initial',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    },
    {
      taskName: 'Data Solution Project',
      taskType: 'project',
      taskProgress: 'selected',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    },
    {
      taskName: 'Other Solution Meeting',
      taskType: 'meeting',
      taskProgress: 'progress',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    },
    {
      taskName: 'Other Solution Project',
      taskType: 'project',
      taskProgress: 'done',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
