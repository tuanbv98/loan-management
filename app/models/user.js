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
    full_name: {
      type: DataTypes.STRING(100),
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
    // Spam zalo
    spam_zalo: {
      type: DataTypes.ENUM("off", "on"),
      defaultValue: "off",
    },
    // Spam icloud
    spam_icloud: {
      type: DataTypes.ENUM("off", "on"),
      defaultValue: "off",
    },
    avatar_url: {
      type: DataTypes.STRING(255),
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    last_login: {
      type: DataTypes.DATE,
    },
  });

  return User;
};
