const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const ErrorHandler = require("./middlewares/ErrorHandler");
const { runMigrations } = require("./migration");
const tasksRoute = require("./routes/tasks");
const reportsRoute = require("./routes/reports");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use("/api/tasks", tasksRoute);
app.use("/api/reports", reportsRoute);

app.use(ErrorHandler);

runMigrations()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((error) => {
    console.error("Error starting the app:", error);
  });

module.exports = app;
