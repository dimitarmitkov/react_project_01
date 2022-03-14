'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taskType: {
        allowNull: false,
        type: Sequelize.ENUM('project', 'meeting'),
        defaultValue: 'project',
      },
      taskName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      taskProgress: {
        allowNull: false,
        type: Sequelize.ENUM('initial', 'selected', 'progress', 'review', 'done'),
        defaultValue: 'initial',
      },
      initiatedAt: {
        type: Sequelize.DATE
      },
      initiatedByUserId: {
        type: Sequelize.INTEGER
      },
      selectedAt: {
        type: Sequelize.DATE
      },
      selectedByUserId: {
        type: Sequelize.INTEGER
      },
      progressAt: {
        type: Sequelize.DATE
      },
      progressByUserId: {
        type: Sequelize.INTEGER
      },
      reviewAt: {
        type: Sequelize.DATE
      },
      reviewByUserId: {
        type: Sequelize.INTEGER
      },
      doneAt: {
        type: Sequelize.DATE
      },
      doneByUserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};