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
      // references: {
      //   model: "users",
      //   key: "id",
      // },
      // onDelete: "CASCADE",
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
      // Số tháng vay
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monthly_payment: {
      // Số tiền phải trả mỗi tháng
      type: DataTypes.DOUBLE,
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
    paid_amount: {
      // Tổng tiền đã trả
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    remaining_amount: {
      // Số tiền còn lại
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Đang trả", "Quá hạn", "Đã tất toán"),
      defaultValue: "Đang trả",
    }
  });

  return Loan;
};
