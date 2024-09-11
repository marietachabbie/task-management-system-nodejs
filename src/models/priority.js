"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("Priority", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    level: {
      type: DataTypes.ENUM("low", "medium", "high"),
      allowNull: false,
    },
  }, {
    tableName: "priorities",
    timestamps: false,
  });

  return User;
};
