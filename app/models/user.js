module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");

  const User = sequelize.define("users", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(100),
    },
    phone_number: {
      type: DataTypes.STRING(20),
    },
    avatar_url: {
      type: DataTypes.STRING(255),
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "locked"),
      defaultValue: "active",
    },
    last_login: {
      type: DataTypes.DATE,
    },
    created_by: {
      type: DataTypes.BIGINT,
      references: {
        model: "users",
        key: "id",
      },
    },
    updated_by: {
      type: DataTypes.BIGINT,
      references: {
        model: "users",
        key: "id",
      },
    },
  });

  return User;
};
