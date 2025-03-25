module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");

  const Loan = sequelize.define("loans", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      // Khách hàng vay
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    loan_code: {
      // Mã khoản vay
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    amount: {
      // Số tiền vay
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    interest_rate: {
      // Lãi suất (%)
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    duration: {
      // Số ngày vay
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      // Ngày bắt đầu vay
      type: DataTypes.DATE,
      allowNull: false,
    },
    due_date: {
      // Ngày đến hạn
      type: DataTypes.DATE,
      allowNull: false,
    },
    day_amount: {
      // Số tiền phải trả mỗi ngày
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    received_amount: {
      // Số tiền nhận lại
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    paid_amount: {
      // Tổng tiền phải trả
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    seven_day_of_amount: {
      // Số tiền 7 ngày đầu
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("Đang trả", "Quá hạn", "Đã tất toán"),
      defaultValue: "Đang trả",
    }
  });

  return Loan;
};
