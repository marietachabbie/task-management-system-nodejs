const httpMocks = require("node-mocks-http");
const reportsController = require("../controllers/reports");
const reportService = require("../services/report");
const { requestSchemaForReports, validationError } = require("../validators/requestValidator");

describe("reportsController", () => {
  it("getTasksByUser returns all tasks assigned to given user", async () => {
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
          title: "Fix money transfer description ASAP"
        }
      }
    ];

    jest.spyOn(reportService, "getAllByUserId").mockResolvedValueOnce(mockResults);

    const req = { params: { userId: "2" } };
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await reportsController.getTasksByUser(req, res, next);
    const data = res._getJSONData();

    expect(reportService.getAllByUserId).toHaveBeenCalledWith("2");
    expect(res.statusCode).toEqual(200);
    expect(data).toEqual(mockResults);
  });

  it("getTasksByUser returns empty array if no task found for given user", async () => {
    const mockResults = [];

    jest.spyOn(reportService, "getAllByUserId").mockResolvedValueOnce(mockResults);

    const req = { params: { userId: "123" } };
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await reportsController.getTasksByUser(req, res, next);
    const data = res._getJSONData();

    expect(reportService.getAllByUserId).toHaveBeenCalledWith("123");
    expect(res.statusCode).toEqual(200);
    expect(data).toEqual(mockResults);
  });

  it("getTasksByUser throws error when invalid user ID provided", async () => {
    const req = { params: { userId: "userId" } };
    const res = httpMocks.createResponse();
    const next = jest.fn();

    const valError = new validationError("User ID must be numeric and positive", "userId");
    jest.spyOn(requestSchemaForReports, "validate").mockReturnValueOnce({ error: valError });

    await reportsController.getTasksByUser(req, res, next);

    expect(next).toBeCalledWith(valError);
  });

  it("getCompletedTask returns all completed tasks with average time of completion", async () => {
    const mockTasks = {
      count: 3,
      rows: [
        {
          created_at: "2024-09-11 19:54:39.923Z",
          completed_at: "2024-09-25 19:54:39.923Z",
        },
        {
          created_at: "2024-09-11 21:57:36.076Z",
          completed_at: "2024-09-25 21:57:36.076Z",
        },
        {
          created_at: "2024-09-11 19:54:39.923Z",
          completed_at: "2024-09-18 19:54:39.923Z",
        }
      ],
    }

    const mockResults = {
      "Number of tasks completed": 3,
      "Average time": "11.67 days"
    };

    jest.spyOn(reportService, "getAllCompleted").mockResolvedValueOnce(mockTasks);

    const req = {};
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await reportsController.getCompletedTask(req, res, next);
    const data = res._getJSONData();

    expect(reportService.getAllByUserId).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    expect(data).toEqual(mockResults);
  });

  it("getCompletedTask returns zeroes when no completed task exists", async () => {
    const mockTasks = { count: 0, rows: [] };

    const mockResults = {
      "Number of tasks completed": 0,
      "Average time": "0.00 days"
    };

    jest.spyOn(reportService, "getAllCompleted").mockResolvedValueOnce(mockTasks);

    const req = {};
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await reportsController.getCompletedTask(req, res, next);
    const data = res._getJSONData();

    expect(reportService.getAllByUserId).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    expect(data).toEqual(mockResults);
  });
});
