"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(125),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(125),
      allowNull: false,
    },
  }, {
    tableName: "users",
    timestamps: false,
  });

  return User;
};
