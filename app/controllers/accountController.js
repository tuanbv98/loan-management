const { validationResult } = require('express-validator');
const db = require("../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const User = db.user;

const accountController = {
  getAccounts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 20;
      const offset = (page - 1) * limit;

      const textSearch = req.body.textSearch || '';
      const status = req.body.status;

      const whereCondition = {
        [Op.or]: [
          { user_name: { [Op.like]: `%${textSearch}%` } },
          { full_name: { [Op.like]: `%${textSearch}%` } },
          { email: { [Op.like]: `%${textSearch}%` } },
          { status: { [Op.like]: `%${textSearch}%` } }
        ],
      };

      if (status) {
        whereCondition.status = status;
      }

      const { count, rows: accounts } = await User.findAndCountAll({
        where: whereCondition,
        limit,
        offset
      });

      const totalPages = Math.ceil(count / limit);

      res.render('account/index', {
        accounts,
        currentPageNumber: page,
        totalPages,
        limit,
        oldData: {
          textSearch: textSearch,
          status: status
        }
      });
    } catch (error) {
      console.error('customers Error:', error);
      res.status(500).render('error', {
        message: 'Error loading accounts',
        error: process.env.NODE_ENV === 'development' ? error : {}
      });
    }
  },

  formCreate: async (req, res) => {
    try {
      res.render('account/create', {
        errors: [],
        oldData: {}
      });
    } catch (error) {
      console.error('account Error:', error);
      res.status(500).render('error', {
        message: 'Error loading account create',
        error: process.env.NODE_ENV === 'development' ? error : {}
      });
    }
  },

  createAccount: async (req, res) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        return res.render('account/create', {
          errors: errors.array(),
          oldData: req.body
        });
      }

      await User.create({
        user_name: req.body.user_name,
        full_name: req.body.full_name,
        email: req.body.email,
        password_hash: bcrypt.hashSync(req.body.password_hash, 8),
        spam_zalo: req.body.spam_zalo,
        spam_icloud: req.body.spam_icloud,
        avatar_url: null,
        role: req.body.role,
        status: req.body.status,
        last_login: null,
      });

      return res.redirect('/accounts');

    } catch (error) {
      console.log("error: ", error);
      res.render("account/create", {
        error: error,
        errors: [],
        oldData: {}
      });
    }
  },

  // Thông tin chi tiết người dùng
  accountDetail: async (req, res) => {
    try {
      const id = user_id = req.params.id;
      const account = await User.findOne({ where: { id } });

      res.render('account/show', {
        account,
        errors: [],
      });
    } catch (error) {
      console.error("error: ", error);
      res.status(500).render('error', {
        message: error,
        error: process.env.NODE_ENV === 'development' ? error : {}
      });
    }
  },

  // Cập nhật thông tin người dùng
  accountEdit: async (req, res) => {
    try {
      const id = req.params.id;
      await User.update(
        {
          user_name: req.body.user_name,
          full_name: req.body.full_name,
          email: req.body.email,
          // password_hash: bcrypt.hashSync(req.body.password_hash, 8),
          spam_zalo: req.body.spam_zalo,
          spam_icloud: req.body.spam_icloud,
          // avatar_url: null,
          role: req.body.role,
          // status: req.body.status,
          // last_login: null,
        },
        { where: { id } }
      );

      return res.redirect('/accounts');

    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = accountController;