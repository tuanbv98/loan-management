'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");
const moment = require("moment");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        user_name: 'admin01',
        full_name: 'admin',
        email: 'admin01@gmail.com',
        password_hash: bcrypt.hashSync('12345678', 8),
        avatar_url: null,
        role: 'admin',
        status: 'active',
        last_login: null,
        createdAt: moment().format("YYYY-MM-DD"),
        updatedAt: moment().format("YYYY-MM-DD"),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
