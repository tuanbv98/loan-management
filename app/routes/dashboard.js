const express = require('express');
const { body, matchedData } = require('express-validator');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const customerController = require('../controllers/customerController');
const settingsController = require('../controllers/settingsController');
const loanController = require('../controllers/loanController');
const reportsController = require('../controllers/reportController');
const accountController = require('../controllers/accountController');
const authController = require('../controllers/authController');

// Login
router.get('/login', authController.showLoginForm);
router.post('/login', authController.login);

// Dashboard
router.get('/', dashboardController.getDashboard);
router.get('/logout', dashboardController.logout);

// Customers
router.get('/customers', customerController.getCustomers);
router.get('/customers/create', customerController.formCreate);
router.post(
    '/customers/create',
    // [
    //     body('user_name').notEmpty().withMessage('Vui lòng nhập tên đăng nhập'),
    //     body('email').isEmail().withMessage('Vui lòng nhập đúng định dạng email'),
    //     body('password_hash').isLength({ min: 8 }).withMessage('Mật khẩu phải có ít nhất 8 ký tự'),
    //     body('confirm_password')
    //     .custom((value, { req }) => {
    //         if (value !== req.body.password_hash) {
    //             throw new Error('Mật khẩu xác nhận không khớp với mật khẩu');
    //         }
    //         return true;
    //     })
    // ],
    customerController.createCustome
);

// Loan
router.get('/loans', loanController.getLoans);

// Settings
router.get('/settings', settingsController.getSettings);

// Reports
router.get('/reports', reportsController.getReports);

// Accounts
router.get('/accounts', accountController.getAccounts);
router.get('/accounts/create', accountController.formCreate);
router.post(
    '/accounts/create',
    [
        body('user_name').notEmpty().withMessage('Vui lòng nhập tên đăng nhập'),
        body('email').isEmail().withMessage('Vui lòng nhập đúng định dạng email'),
        body('password_hash').isLength({ min: 8 }).withMessage('Mật khẩu phải có ít nhất 8 ký tự'),
        body('confirm_password')
        .custom((value, { req }) => {
            if (value !== req.body.password_hash) {
                throw new Error('Mật khẩu xác nhận không khớp với mật khẩu');
            }
            return true;
        })
    ],
    accountController.createAccount
);

module.exports = router;