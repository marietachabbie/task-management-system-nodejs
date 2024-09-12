const { Task } = require("../models");

module.exports = {
  getAll: async () => {
    try {
      return await Task.findAll();
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  getOne: async (id) => {
    try {
      return Task.findOne({ where: { id } });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  updateStatus: async (id, status, completed_at) => {
    try {
      await Task.update({ status, completed_at }, { where: { id } });
      return { message: `Successfully updated status of the task with id: ${id}` };
    } catch (error) {
      console.error("Error updating a task:", error);

      throw error;
    }
  },

  createOne: async (taskData) => {
    try {
      const { dataValues } = await Task.create(taskData);
      return { message: `Successfully inserted task under id: ${dataValues.id}` };
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },
};
