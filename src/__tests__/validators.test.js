const {
  validationError,
  requestSchemaForCreate,
  requestSchemaForUpdateStatus,
  requestSchemaForReports,
} = require("../validators/requestValidator");

describe("Validators", () => {
  it("requestSchemaForReports validates req schema for reports", () => {
    const req = {
      params: {
        userId: "2",
      }
    };

    const { error } = requestSchemaForReports.validate(req);
    expect(error).toBe(undefined);
  });

  it("requestSchemaForReports throws error when invalid user ID provided", () => {
    const req = {
      params: {
        userId: "userId",
      }
    };

    const { error } = requestSchemaForReports.validate(req);

    expect(error).toBeInstanceOf(validationError);
    expect(error.message).toBe("User ID must be numeric and positive");
    expect(error.fieldName).toBe("userId");
  });

  it("requestSchemaForUpdateStatus validates req schema for status update", () => {
    const req = {
      params: {
        id: "2",
      },

      body: {
        status: 3,
      }
    };

    const { error } = requestSchemaForUpdateStatus.validate(req);
    expect(error).toBe(undefined);
  });

  it("requestSchemaForUpdateStatus throws error when invalid ID provided", () => {
    const req = {
      params: {
        id: "id",
      }
    };

    const { error } = requestSchemaForUpdateStatus.validate(req);

    expect(error).toBeInstanceOf(validationError);
    expect(error.message).toBe("Task ID must be numeric and positive");
    expect(error.fieldName).toBe("taskId");
  });

  it("requestSchemaForUpdateStatus throws error when invalid status ID provided", () => {
    const req = {
      params: {
        id: "1",
      },
      body: {
        status: "24",
      }
    };

    const { error } = requestSchemaForUpdateStatus.validate(req);

    expect(error).toBeInstanceOf(validationError);
    expect(error.message).toBe("Status must be number between 1 and 4");
    expect(error.fieldName).toBe("status");
  });

  it("requestSchemaForCreate validates req schema for task creation", () => {
    const req = {
      body: {
        data: {
          title: "Title",
          due_date: "2024-09-25T15:54:39.923Z",
          description: "Description sample",
          assignee: "1",
          priority: "1",
          status: "1",
        },
      }
    };

    const { error } = requestSchemaForCreate.validate(req);
    expect(error).toBe(undefined);
  });

  it("requestSchemaForCreate throws error when no title provided", () => {
    const req = {
      body: {
        data: {
          due_date: "2024-09-25T15:54:39.923Z",
        },
      }
    };

    const { error } = requestSchemaForCreate.validate(req);

    expect(error).toBeInstanceOf(validationError);
    expect(error.message).toBe("Title can not be empty");
    expect(error.fieldName).toBe("title");
  });

  it("requestSchemaForCreate throws error when invalid status provided", () => {
    const req = {
      body: {
        data: {
          title: "Title",
          due_date: "2024-09-25T15:54:39.923Z",
          status: "status",
        },
      }
    };

    const { error } = requestSchemaForCreate.validate(req);

    expect(error).toBeInstanceOf(validationError);
    expect(error.message).toBe("Status must be number between 1 and 4");
    expect(error.fieldName).toBe("status");
  });

  it("requestSchemaForCreate throws error when invalid priority provided", () => {
    const req = {
      body: {
        data: {
          title: "Title",
          due_date: "2024-09-25T15:54:39.923Z",
          priority: "26",
        },
      }
    };

    const { error } = requestSchemaForCreate.validate(req);

    expect(error).toBeInstanceOf(validationError);
    expect(error.message).toBe("Priority must be number between 1 and 3");
    expect(error.fieldName).toBe("priority");
  });
})
