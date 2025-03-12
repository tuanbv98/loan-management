const { validationResult } = require('express-validator');
const db = require("../models");
const Customer = db.customer;
const Loan = db.loan;
const crypto = require('crypto');
const { Sequelize } = require("sequelize");
const moment = require("moment");

const customerController = {
  getCustomers: async (req, res) => {
    try {
      res.render('customers/index', {
        title: 'Customers',
        currentPage: 'customers',
      });
    } catch (error) {
      console.error('customers Error:', error);
      res.status(500).render('error', {
        message: 'Error loading customers',
        error: process.env.NODE_ENV === 'development' ? error : {}
      });
    }
  },

  formCreate: async (req, res) => {
    try {
      res.render('customers/create', {
        error: null,
        errors: [],
        oldData: {}
      });
    } catch (error) {
      res.status(500).render('error', {
        message: 'Error loading custome create',
        error: process.env.NODE_ENV === 'development' ? error : {}
      });
    }
  },

  createCustomer: async (req, res) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        return res.render('customers/create', {
          errors: errors.array(),
          oldData: req.body
        });
      }

      const customer = await Customer.create({
        full_name: req.body.full_name,
        national_id: req.body.national_id,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        gender: req.body.gender == '0' ? 'Nam' : 'Nữ',
      });

      console.log("customer: ", typeof req.body.interest_rate*req.body.amount);

      await Loan.create({
        user_id: customer.id,
        loan_code: crypto.randomBytes(20).toString('hex').slice(0, 20),
        amount: req.body.amount,
        interest_rate: req.body.interest_rate,
        duration: 40,
        monthly_payment: 0,
        start_date: moment().format("YYYY-MM-DD"),
        due_date: moment().add(40, "days").format("YYYY-MM-DD"),
        paid_amount: parseInt((req.body.interest_rate*req.body.amount) + req.body.amount),
        remaining_amount: Math.round((((req.body.interest_rate * req.body.amount) + req.body.amount) / 40) * 7),
        status: 'Đang trả',
      });

      return res.render("customers/index", { message: "Đăng ký tài khoản thành công." })

    } catch (error) {
      let mesErr = '';
      console.log("error: ", error);

      if (error instanceof Sequelize.UniqueConstraintError) {
        mesErr = `"${ error.errors[0].value }" đã tồn tại. Vui lòng chọn giá trị khác!`;
      } else {
        mesErr = error.message;
      }

      res.render("customers/create", {
        error: mesErr,
        errors: errors.array(),
        oldData: req.body
      });
    }
  },
};

module.exports = customerController;