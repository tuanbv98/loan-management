const db = require("../models");
const crypto = require('crypto');
const moment = require("moment");
const Customer = db.customer;
const Loan = db.loan;

const loanController = {
    getLoans: async (req, res) => {
        try {
            res.render('loan/index', {
                title: 'Loan',
                currentPage: 'loan',
            });
        } catch (error) {
            console.error('customers Error:', error);
            res.status(500).render('error', {
                message: 'Error loading loan',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    },

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

    createLoan: async (req, res) => {
        try {
            const { user_id, amount, interest_rate, duration, start_date } = req.body;

            const customer = await Customer.findByPk(user_id);
            if (!customer) {
                return res.status(404).render('error', {
                    message: 'Không tìm thấy khách hàng'
                });
            }

            // Tính toán các giá trị
            const total_amount = parseInt(amount) + (parseInt(amount) * parseFloat(interest_rate) / 100);
            const monthly_payment = Math.round(total_amount / duration);
            const due_date = moment(start_date).add(duration, 'days').format('YYYY-MM-DD');

            await Loan.create({
                user_id,
                loan_code: crypto.randomBytes(20).toString('hex').slice(0, 20),
                amount,
                interest_rate,
                duration,
                monthly_payment,
                start_date,
                due_date,
                paid_amount: 0,
                remaining_amount: total_amount,
                status: 'Đang trả',
            });

            res.redirect(`/customers/${user_id}`);
        } catch (error) {
            res.render('loans/create', {
                customer: await Customer.findByPk(req.body.user_id),
                error: error.message,
                oldData: req.body
            });
        }
    }
};

module.exports = loanController;