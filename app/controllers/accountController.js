const { validationResult } = require('express-validator');
const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;

const accountController = {
    getAccounts: async (req, res) => {
        try {
            res.render('account/index', {
                title: 'Accounts',
                currentPage: 'accounts',
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
                full_name: req.body.full_name,
                user_name: req.body.user_name,
                email: req.body.email,
                password_hash: bcrypt.hashSync(req.body.password_hash, 8),
                role: req.body.role,
                status: req.body.status,
            });

            return res.render("accounts", { message: "Đăng ký tài khoản thành công."})

        } catch (error) {
            res.render("accounts/create", { error: "Lỗi tạo mới!" });
        }
    },
};

module.exports = accountController;