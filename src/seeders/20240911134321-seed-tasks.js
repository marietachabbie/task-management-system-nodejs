'use strict';

const NOW = new Date();
const DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tasks", [
      {
        title: "Fix payment parsing error",
        description: "Parser doesn't handle payment details well, when the currency is EURO",
        created_at: new Date(),
        due_date: new Date(NOW.getTime() + 14 * DAY_IN_MILISECONDS),
        completed_at: new Date(NOW.getTime() + 12 * DAY_IN_MILISECONDS),
      },
      {
        title: "Add custom rules to local eslint config",
        description: "Recommended rules suck",
        priority: 2,
        status: 3,
        assignee: "1",
        created_at: new Date(),
        due_date: new Date(NOW.getTime() + 7 * DAY_IN_MILISECONDS),
        completed_at: new Date(NOW.getTime() + 7 * DAY_IN_MILISECONDS),

      },
      {
        title: "Fix money transfer description ASAP",
        description: "",
        priority: 3,
        status: 3,
        assignee: "2",
        created_at: new Date(),
        due_date: new Date(NOW.getTime() + 3 * DAY_IN_MILISECONDS),
        completed_at: new Date(NOW.getTime() + 2 * DAY_IN_MILISECONDS),
      },
      {
        title: "Generate JSON files for completed tasks report",
        description: "",
        priority: 2,
        status: 3,
        assignee: "1",
        created_at: new Date(),
        due_date: new Date(NOW.getTime() + 14 * DAY_IN_MILISECONDS),
        completed_at: new Date(NOW.getTime() + 16 * DAY_IN_MILISECONDS),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
