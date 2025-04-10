const db = require("../models");
const crypto = require('crypto');
const moment = require("moment");
const config = require("../config/config.json");
const { Sequelize, Op, where } = require("sequelize");
const Customer = db.customer;
const Loan = db.loan;

const loanController = {
    getLoans: async (req, res) => {
        try {
            const accountInfo = req.session.user;
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
                    ],
                }
                : {};

            if (accountInfo.role !== 'admin') {
                whereCondition.account_id = accountInfo.id;
            }

            const { count, rows: loans } = await Loan.findAndCountAll({
                where: whereCondition,
                limit,
                offset
            });

            const loanInfo = {
                numberLoans: loans.length,
                overdueLoans: loans.filter(loan => loan.status === "Quá hạn").length,
                totalAmount: loans.reduce((sum, loan) => sum + loan.amount, 0),
            };

            const totalPages = Math.ceil(count / limit);

            res.render('loan/index', {
            loans,
            loanInfo,
            currentPageNumber: page,
            totalPages,
            oldData: {
                textSearch: textSearch
            },
            limit: limit
            });
        } catch (error) {
            console.error('loans Error:', error);
            res.status(500).render('error', {
                message: 'Error loading loan',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    },

    // Tạo mới khoản vay từ màn hình khách hàng
    formCreate: async (req, res) => {
        try {
            const customer = await Customer.findByPk(req.params.id);
            if (!customer) {
                return res.status(404).render('error', {
                    message: 'Không tìm thấy khách hàng'
                });
            }

            res.render('loan/create', {
                customer,
                error: null,
                oldData: {}
            });
        } catch (error) {
            res.status(500).render('error', {
                message: 'Lỗi server',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    },
    createLoanFollowCustomer: async (req, res) => {
        try {
            const id = user_id = req.params.id;
            const customer = await Customer.findByPk(id);
            if (!customer) {
                return res.status(404).render('error', {
                    message: 'Không tìm thấy khách hàng'
                });
            }

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
            res.render('loans/create', {
                customer: await Customer.findByPk(req.body.user_id),
                error: error.message,
                oldData: req.body
            });
        }
    },

    // Tạo mới khoản vay từ màn hình quản lý khoản vay
    formAdd: async (req, res) => {
        try {
            const accountInfo = req.session.user
            const whereCondition = {};
            if (accountInfo.role !== 'admin') {
                whereCondition.account_id = accountInfo.id;
            }
            const customers = await Customer.findAll({
                where: whereCondition,
            });

            res.render('loan/add', {
                customers,
                error: null,
                oldData: {}
            });
        } catch (error) {
            console.log("error: ", error);
            res.status(500).render('error', {
                message: 'Lỗi server',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    },
    addLoan: async (req, res) => {
        try {
            // Số tiền phải trả trong 40 ngày
            const paidAmount = parseInt(req.body.interest_rate*req.body.amount) + parseInt(req.body.amount);
            // Số tiền 7 ngày đầu
            const amountOfSevenDay = Math.round((paidAmount / 40) * 7);
            // Số tiền nhận về
            const amountReceived = parseInt(paidAmount - amountOfSevenDay);
            // Số tiền mỗi ngày phải trả
            const dayPayment = Math.round(amountReceived / 40);

            await Loan.create({
                user_id: req.body.user_id,
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

            res.render('loan/add', {
                customer: null,
                error: null,
                oldData: {}
            });
        } catch (error) {
            res.render('loan/add', {
                customer: null,
                error: null,
                oldData: {}
            });
        }
    },
};

module.exports = loanController;