const { requestSchemaForCreate, requestSchemaForUpdateStatus } = require("../validators/requestValidator");
const taskService = require("../services/task");

module.exports = {
  getTasks: async (req, res, next) => {
    try {
      const tasks = await taskService.getAll();
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  },

  getTask: async (req, res, next) => {
    try {
      const { id } = req.params;
      const task = await taskService.getOne(id);
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  },

  updateStatus: async (req, res, next) => {
    try {
      const { error } = requestSchemaForUpdateStatus.validate(req);
      if (error) throw error;

      const { params: { id }, body: { status } } = req;
      const updateRes = await taskService.updateStatus(id, status, new Date());

      res.status(201).json(updateRes);
    } catch (error) {
      next(error);
    }
  },

  createTask: async (req, res, next) => {
    try {
      const { error } = requestSchemaForCreate.validate(req);
      if (error) throw error;

      const { data } = req.body;
      const createRes = await taskService.createOne(data);

      res.status(201).json(createRes);
    } catch (error) {
      next(error);
    }
  },
};
