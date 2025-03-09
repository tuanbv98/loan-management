module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");

  const Transaction = sequelize.define("transactions", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      // Khách hàng vay
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    user_id: {
      // Khách hàng vay
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    loan_id: {
      // Khoản vay liên quan
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "loans",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    amount: {
      // Số tiền đã thanh toán
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    transaction_date: {
      // Ngày thanh toán
      type: DataTypes.DATE,
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.ENUM("Thanh toán", "Phạt", "Hoàn tiền"),
    },
    status: {
      type: DataTypes.ENUM("Thành công", "Thất bại"),
    },
    details: {
      type: DataTypes.STRING(1000),
    }
  });

  return Transaction;
};
