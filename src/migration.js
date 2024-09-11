const { exec } = require("child_process");

const runMigrations = async () => {
  try {
    await new Promise((resolve, reject) => {
      exec("cd src && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all", (error, stdout, stderr) => {
        if (error) {
          console.error(`Migration error: ${stderr}`);
          reject(error);
        } else {
          console.log(stdout);
          resolve();
        }
      });
    });

    console.log("Migrations have been executed successfully.");
  } catch (error) {
    console.error("Error executing migrations:", error);
  }
};

module.exports = { runMigrations };
