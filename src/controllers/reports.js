// validation
const reportService = require("../services/report");

module.exports = {
  getTasksByUser: async (req, res, next) => {
    try {
      // const { error } = requestSchemaForUpdateStatus.validate(req);
      // if (error) throw error;

      const { userId } = req.params;
      const reports = await reportService.getAllByUserId(userId);
      res.status(200).json(reports);
    } catch (error) {
      next(error);
    }
  },

  getCompletedTask: async (req, res, next) => {
    try {
      const reports = await reportService.getAllCompleted();
      const count = reports.length;

      const totalTime = reports.reduce((acc, curr) => {
        const timeDifference = new Date(curr.due_date).getTime() - new Date(curr.created_at).getTime();
        return acc + timeDifference;
      }, 0);

      const averageTime = (totalTime / count) / (1000 * 60 * 60 * 24);
      const result = {
        "Number of tasks completed": count,
        "Average time": `${averageTime} days`,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
