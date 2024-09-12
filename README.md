# task-management-system-nodejs

A `Node.js` - `Express` app for task management. Supports CRUD, also generates reports about tasks.

## Here are the database relations.

| child_table | child_column | parent_table | parent_column | fk_constraint_name      |
|-------------|--------------|--------------|---------------|-------------------------|
| tasks       | assignee     | users        | id            | tasks_assignee_fkey     |
| tasks       | priority     | priorities   | id            | tasks_priority_fkey     |
| tasks       | status       | statuses     | id            | tasks_status_fkey       |

## Supported endpoints:
* GET `{baseUrl}/api/tasks` returns all tasks from DB
* GET `{baseUrl}/api/tasks/:id` returns task by ID
* POST `{baseUrl}/api/tasks` inserts a new row in the tasks
* POST `{baseUrl}/api/tasks/:id` updates status of given task. If the status is set to 3 (`DONE`), then `completed_at` is set to current date

* GET `{baseUrl}/api/reports/completed` returns the number of completed tasks (status: 3) and the average time of completion
* GET `{baseUrl}/api/reports/:userId` returns all tasks assigned to given member

### To run the app:
```
npm i && npm run start
```

### To run the app on dev (with nodemon):
```
npm i && npm run dev
```

### To run unit tests:
```
npm i && npm run test
```

### To send HTTP requests with VS Code Rest Client extension:
requests.http file provided as a sample

### To set environment variables:
.env file provided as a sample

___
Note: migrations and seeders run on start.
