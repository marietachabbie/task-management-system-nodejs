const Joi = require('@hapi/joi');

class ValidationError extends Error {
  constructor(message, fieldName) {
    super(message);
    this.fieldName = fieldName;
  }
}

module.exports = {
  validationError: ValidationError,
  requestSchemaForCreate: Joi.object({
    body: Joi.object({
      data: Joi.object({
        title: Joi.string().required()
          .error(() => new ValidationError("Title can not be empty", "title")),
        due_date: Joi.date().required()
          .error(() => new ValidationError("Due Date can not be empty", "due_date")),
        description: Joi.string()
          .error(() => new ValidationError("Description must be string", "description")),
        assignee: Joi.number()
          .error(() => new ValidationError("Assignee must be number", "assignee")),
        priority: Joi.number().min(1).max(3)
          .error(() => new ValidationError("Priority must be number between 1 and 3", "priority")),
        status: Joi.number()
          .error(() => new ValidationError("Status must be number between 1 and 4", "status")),
      }),
    }),
  }).unknown(true),

  requestSchemaForUpdateStatus: Joi.object({
    params: Joi.object({
      id: Joi.string().regex(/^\d+$/).required()
        .error(() => new ValidationError("Task ID must be numeric and positive", "taskId")),
    }),

    body: Joi.object({
      status: Joi.number().min(1).max(4)
        .error(() => new ValidationError("Status must be number between 1 and 4", "status")),
    }),
  }).unknown(true),

  requestSchemaForReports: Joi.object({
    params: Joi.object({
      userId: Joi.string().regex(/^\d+$/).required()
        .error(() => new ValidationError("User ID must be numeric and positive", "userId")),
    }),
  }).unknown(true),
};
