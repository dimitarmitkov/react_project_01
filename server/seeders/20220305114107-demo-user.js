'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', 
    [{
      firstName: 'John',
      lastName: 'First',
      email: 'first@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      password: '123',
      role: 'user'
    },
    {
      firstName: 'John',
      lastName: 'Second',
      email: 'second@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      password: '1234567',
      role: 'admin'
    },
    {
      firstName: 'John',
      lastName: 'Third',
      email: 'third@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      password: '1234567',
      role: 'user'
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
