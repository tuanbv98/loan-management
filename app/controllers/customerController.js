const { validationResult } = require('express-validator');
const db = require("../models");
const config = require("../config/config.json");
const crypto = require('crypto');
const { Sequelize, Op, where } = require("sequelize");
const moment = require("moment");
const { count, log } = require('console');

const Customer = db.customer;
const Loan = db.loan;

const customerController = {
  getCustomers: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = config.page_size;
      const offset = (page - 1) * limit;
      const textSearch = req.body.textSearch || '';
      console.log("textSearch: ", textSearch);

      const whereCondition = textSearch
      ? {
          [Op.or]: [
            { full_name: { [Op.like]: `%${textSearch}%` } },
            { national_id: { [Op.like]: `%${textSearch}%` } },
            { phone: { [Op.like]: `%${textSearch}%` } },
            { email: { [Op.like]: `%${textSearch}%` } }
          ]
        }
      : {};

      const { count, rows: customers } = await Customer.findAndCountAll({
        where: whereCondition,
        limit,
        offset
      });

      const totalPages = Math.ceil(count / limit);

      res.render('customers/index', {
        customers,
        currentPageNumber: page,
        totalPages,
        oldData: {
          textSearch: textSearch
        },
        limit: limit
      });
    } catch (error) {
      console.error('customers Error:', error);
      res.status(500).render('error', {
        message: 'Error loading customers',
        error: process.env.NODE_ENV === 'development' ? error : {}
      });
    }
  },

  formCreate: async (_, res) => {
    res.render('customers/create', {
      error: null,
      errors: [],
      oldData: {}
    });
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
        is_spam_zalo: 'inactive',
        is_spam_icloud: 'inactive',
      });

      // Số tiền phải trả trong 40 ngày
      const paidAmount = parseInt(req.body.interest_rate*req.body.amount) + parseInt(req.body.amount);
      // Số tiền 7 ngày đầu
      const amountOfSevenDay = Math.round((paidAmount / 40) * 7);
      // Số tiền nhận về
      const amountReceived = parseInt(paidAmount - amountOfSevenDay);
      // Số tiền mỗi ngày phải trả
      const dayPayment = Math.round(amountReceived / 40);

      await Loan.create({
        user_id: customer.id,
        loan_code: crypto.randomBytes(20).toString('hex').slice(0, 20),
        amount: req.body.amount,
        interest_rate: req.body.interest_rate,
        duration: 40,
        start_date: moment().format("YYYY-MM-DD"),
        due_date: moment().add(40, "days").format("YYYY-MM-DD"),
        day_amount: dayPayment,
        received_amount: amountReceived,
        paid_amount: paidAmount,
        seven_day_of_amount: amountOfSevenDay,
        status: 'Đang trả',
      });

      const page = parseInt(req.query.page) || 1;
      const limit = config.page_size;
      const offset = (page - 1) * limit;

      const { count, rows: customers } = await Customer.findAndCountAll({
        limit,
        offset
      });

      const totalPages = Math.ceil(count / limit);

      return res.render('customers/index', {
        customers,
        currentPageNumber: page,
        totalPages,
        oldData: {
          textSearch: ''
        },
        limit: limit
      });

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

  detailCustomer: async (req, res) => {
    try {
      const id = user_id = req.params.id;
      const customer = await Customer.findOne({where: {id}});
      const loans = await Loan.findAll({
        where: { user_id },
      });

      const loanStats = {
        numberLoans: loans.length,
        overdueLoans: loans.filter(loan => loan.status === "Quá hạn").length,
        totalAmount: loans.reduce((sum, loan) => sum + loan.amount, 0),
        totalInterest: loans.reduce((sum, loan) => sum + (loan.paid_amount - loan.amount), 0),
      };

      res.render('customers/show', {
        customer,
        loanStats,
        loans
      });
    } catch (error) {
      console.error('customers Error:', error);
      res.status(500).render('error', {
        message: 'Error loading customers',
        error: process.env.NODE_ENV === 'development' ? error : {}
      });
    }
  },
};

module.exports = customerController;