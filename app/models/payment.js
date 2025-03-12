module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");

  const Payment = sequelize.define("payments", {
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
    amount_paid: {
      // Số tiền đã thanh toán
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    payment_date: {
      // Ngày thanh toán
      type: DataTypes.DATE,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM("Chuyển khoản", "Ví điện tử"),
    },
    status: {
      type: DataTypes.ENUM("Thành công", "Chờ xử lý", "Thất bại"),
      defaultValue: "Chờ xử lý",
    }
  });

  return Payment;
};
