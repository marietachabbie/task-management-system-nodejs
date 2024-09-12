const httpMocks = require("node-mocks-http");
const tasksController = require("../controllers/tasks");
const taskService = require("../services/task");
const {
  validationError,
  requestSchemaForCreate,
  requestSchemaForUpdateStatus,
} = require("../validators/requestValidator");

describe("tasksController", () => {
  it("getTasks returns all tasks in database", async () => {
    const mockResults = [
      {
        dataValues: {
          assignee: 2,
          created_at: "2024-09-11T15:54:39.923Z",
          description: "",
          due_date: "2024-09-14T15:54:39.923Z",
          id: 9,
          priority: 3,
          status: 2,
          title: "Title 1",
        }
      },
      {
        dataValues: {
          assignee: 2,
          created_at: "2024-09-11T15:54:39.923Z",
          description: "",
          due_date: "2024-09-14T15:54:39.923Z",
          id: 9,
          priority: 3,
          status: 2,
          title: "Title 2",
        }
      },
    ];

    jest.spyOn(taskService, "getAll").mockResolvedValueOnce(mockResults);

    const req = {};
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await tasksController.getTasks(req, res, next);
    const data = res._getJSONData();

    expect(taskService.getAll).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    expect(data).toEqual(mockResults);
  });

  it("getTask returns task by given ID", async () => {
    const mockResult = [
      {
        dataValues: {
          assignee: 2,
          created_at: "2024-09-11T15:54:39.923Z",
          description: "",
          due_date: "2024-09-14T15:54:39.923Z",
          id: 9,
          priority: 3,
          status: 2,
          title: "Title 1",
        }
      },
    ];

    jest.spyOn(taskService, "getOne").mockResolvedValueOnce(mockResult);

    const req = { params: { id: 9 } };
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await tasksController.getTask(req, res, next);
    const data = res._getJSONData();

    expect(taskService.getAll).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    expect(data).toEqual(mockResult);
  });

  it("updateStatus updates status of task by given ID", async () => {
    const id = "9";
    const mockResult = {
      message: `Successfully updated status of the task with id: ${id}`,
    }
    jest.spyOn(taskService, "updateStatus").mockResolvedValueOnce(mockResult);

    const req = {
      params: { id },
      body: {
        status: 2,
      }
    };

    const res = httpMocks.createResponse();
    const next = jest.fn();

    await tasksController.updateStatus(req, res, next);
    const data = res._getJSONData();

    expect(taskService.updateStatus).toHaveBeenCalled();
    expect(res.statusCode).toEqual(201);
    expect(data).toEqual(mockResult);
  });

  it("updateStatus throws error when invalid id is passed", async () => {
    const req = {
      params: { id: "taskId" },
      body: {
        status: 2,
      }
    };

    const res = httpMocks.createResponse();
    const next = jest.fn();

    const valError = new validationError("Task ID must be numeric and positive", "id");
    jest.spyOn(requestSchemaForUpdateStatus, "validate").mockReturnValueOnce({ error: valError });

    await tasksController.updateStatus(req, res, next);

    expect(next).toBeCalledWith(valError);
  });

  it("updateStatus throws error when invalid status id is passed", async () => {
    const req = {
      params: { id: "taskId" },
      body: {
        status: 12,
      }
    };

    const res = httpMocks.createResponse();
    const next = jest.fn();

    const valError = new validationError("Status must be number between 1 and 4", "id");
    jest.spyOn(requestSchemaForUpdateStatus, "validate").mockReturnValueOnce({ error: valError });

    await tasksController.updateStatus(req, res, next);

    expect(next).toBeCalledWith(valError);
  });

  it("createTask inserts new row to <tasks> table", async () => {
    const mockResult = {
      message: `Successfully inserted task`,
    }
    jest.spyOn(taskService, "createOne").mockResolvedValueOnce(mockResult);

    const req = {
      body: {
        data: {
          title: "Title",
          description: "N/A",
          assignee: "1",
          due_date: "2024-09-25T15:54:39.923Z"
        }
      }
    };

    const res = httpMocks.createResponse();
    const next = jest.fn();

    await tasksController.createTask(req, res, next);
    const data = res._getJSONData();

    expect(taskService.createOne).toHaveBeenCalled();
    expect(res.statusCode).toEqual(201);
    expect(data).toEqual(mockResult);
  });

  it("createTask throws error when required fields are not provided", async () => {
    const req = {
      body: {
        data: {
          description: "N/A",
          assignee: "1",
        }
      }
    };

    const res = httpMocks.createResponse();
    const next = jest.fn();

    const valError = new validationError("Title and Due Date are required", "");
    jest.spyOn(requestSchemaForCreate, "validate").mockReturnValueOnce({ error: valError });

    await tasksController.createTask(req, res, next);

    expect(next).toBeCalledWith(valError);
  });

  it("createTask throws error when invalid type is provided for date", async () => {
    const req = {
      body: {
        data: {
          title: "Title",
          due_date: "helloworld",
          description: "N/A",
          assignee: "1",
        }
      }
    };

    const res = httpMocks.createResponse();
    const next = jest.fn();

    const valError = new validationError("Due Date must be date", "due_date");
    jest.spyOn(requestSchemaForCreate, "validate").mockReturnValueOnce({ error: valError });

    await tasksController.createTask(req, res, next);

    expect(next).toBeCalledWith(valError);
  });
});
