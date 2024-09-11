const { Task } = require("../models");

module.exports = {
  getAllByUserId: async (id) => {
    try {
      return Task.findAll({ where: { assignee: id } });
    } catch (error) {
      console.error("Error fetching tasks by user ID:", error);
      throw error;
    }
  },

  getAllCompleted: async () => {
    try {
      return Task.findAll({ where: { status: 2 } });
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
      throw error;
    }
  },
};
