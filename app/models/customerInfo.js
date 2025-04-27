module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");

  const CustomerInfo = sequelize.define("customer_infos", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    icloud: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    id_card_front: {
      type: Sequelize.STRING(255), // đường dẫn ảnh mặt trước
      allowNull: true
    },
    images_url: {
      type: Sequelize.STRING(5000), // đường dẫn ảnh
      allowNull: true
    },
    id_card_back: {
      type: Sequelize.STRING(255), // đường dẫn ảnh mặt sau
      allowNull: true
    },
    id_card_issue_date: {
      type: Sequelize.DATEONLY, // Ngày cấp
      allowNull: true
    },
    id_card_issue_place: {
      type: Sequelize.STRING(100), // Nơi cấp
      allowNull: true
    },
    contact_phone_1: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    contact_phone_2: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    contact_phone_3: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    // Thông tin tài khoản ngân hàng
    bank_name: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    bank_account_number: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    bank_account_name: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    // Thông tin công việc
    workplace_name: {
      type: Sequelize.STRING(100), // Tên nơi làm việc
      allowNull: true
    },
    workplace_address: {
      type: Sequelize.TEXT, // Địa chỉ nơi làm việc
      allowNull: true
    },
  });

  return CustomerInfo;
};
