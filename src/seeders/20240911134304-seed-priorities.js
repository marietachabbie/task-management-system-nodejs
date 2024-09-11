"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("priorities", [
      { level: "low" },
      { level: "medium" },
      { level: "high" },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("priorities", null, {});
  },
};
