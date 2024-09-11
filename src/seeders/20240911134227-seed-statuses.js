"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("statuses", [
      { state: "to do" },
      { state: "doing" },
      { state: "done" },
      { state: "on hold" },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("statuses", null, {});
  },
};
