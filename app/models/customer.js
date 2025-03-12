module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");

  const Customer = sequelize.define("customers", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    national_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING(255),
    },
    gender: {
      type: DataTypes.ENUM("Nam", "Nữ"),
    },
  });

  return Customer;
};
