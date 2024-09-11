const Joi = require('@hapi/joi');

class ValidationError extends Error {
  constructor(message, fieldName) {
    super(message);
    this.fieldName = fieldName;
  }
}

module.exports = {
  requestSchemaForCreate: Joi.object({
    body: Joi.object({
      data: Joi.object({
        title: Joi.string().required()
          .error(() => new ValidationError("Title can not be empty")),
        due_date: Joi.date().required()
          .error(() => new ValidationError("Due Date can not be empty")),
        description: Joi.string()
          .error(() => new ValidationError("Description must be string")),
        assignee: Joi.number()
          .error(() => new ValidationError("Assignee must be number")),
        priority: Joi.number()
          .error(() => new ValidationError("Priority must be number")),
        status: Joi.number()
          .error(() => new ValidationError("Status must be number")),
      }),
    }),
  }).unknown(true),

  requestSchemaForUpdateStatus: Joi.object({
    params: Joi.object({
      id: Joi.string().regex(/^\d+$/).required()
        .error(() => new ValidationError("User ID must be numeric and positive", "userId")),
    }),

    body: Joi.object({
      status: Joi.number()
        .error(() => new ValidationError("Status must be number")),
    }),
  }).unknown(true),
};
