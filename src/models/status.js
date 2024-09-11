"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Status = sequelize.define("Status", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    state: {
      type: DataTypes.ENUM("to do", "doing", "done", "on hold"),
      allowNull: false,
    },
  }, {
    tableName: "statuses",
    timestamps: false,
  });

  return Status;
};
