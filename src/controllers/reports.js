const { requestSchemaForReports } = require("../validators/requestValidator");
const reportService = require("../services/report");

module.exports = {
  getTasksByUser: async (req, res, next) => {
    try {
      const { error } = requestSchemaForReports.validate(req);
      if (error) throw error;

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
      const { rows, count } = reports;
      let totalTime = 0;

      if (count > 0) {
        totalTime = rows.reduce((acc, curr) => {
          const timeDifference = new Date(curr.completed_at).getTime() - new Date(curr.created_at).getTime();
          return acc + timeDifference;
        }, 0);
      }

      const averageTime = totalTime > 0 ? (totalTime / count) / (1000 * 60 * 60 * 24) : 0;
      const result = {
        "Number of tasks completed": count,
        "Average time": `${(averageTime).toFixed(2)} days`,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
