"use strict";

const { DataTypes } = require("sequelize");
const Priority = require("./priority");
const User = require("./user");
const Status = require("./status");

module.exports = (sequelize) => {
  const Task = sequelize.define("Task", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
    },
    priority: {
      type: DataTypes.INTEGER,
      references: {
        model: Priority,
        key: "id",
      },
      defaultValue: 1,
    },
    status: {
      type: DataTypes.INTEGER,
      references: {
        model: Status,
        key: "id",
      },
      defaultValue: 1,
    },
    assignee: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCreate: (instance) => {
        // Set due_date to be 2 weeks after created_at
        instance.due_date = new Date(instance.created_at.getTime() + 14 * 24 * 60 * 60 * 1000);
      },
    },
    tableName: "tasks",
    timestamps: false,
  });

  Task.associate = (models) => {
    Task.belongsTo(models.Priority, { foreignKey: "priority" });
    Task.belongsTo(models.User, { foreignKey: "assignee" });
    Task.belongsTo(models.Status, { foreignKey: "status" });
  };

  return Task;
};
