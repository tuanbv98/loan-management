const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
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

router.get('/401', authController.showUnauthorized);

// Dashboard
router.get(
    '/',
    checkRole(['admin', 'user']),
    dashboardController.getDashboard
);
router.get(
    '/logout',
    checkRole(['admin', 'user']),
    dashboardController.logout
);

// Customers
router.get(
    '/customers',
    checkRole(['admin', 'user']),
    customerController.getCustomers
);
router.get(
    '/customers/create',
    checkRole(['admin', 'user']),
    customerController.formCreate
);
router.post(
    '/customers/create',
    checkRole(['admin', 'user']),
    [
        body('full_name').notEmpty().withMessage('Vui lòng nhập tên đăng nhập'),
        body('email').isEmail().withMessage('Vui lòng nhập đúng định dạng email'),
    ],
    customerController.createCustomer
);

// Loan
router.get(
    '/loans',
    checkRole(['admin', 'user']),
    loanController.getLoans
);

// Settings
router.get(
    '/settings',
    checkRole(['admin', 'user']),
    settingsController.getSettings
);

// Reports
router.get(
    '/reports',
    checkRole(['admin', 'user']),
    reportsController.getReports
);

// Accounts
router.get(
    '/accounts',
    checkRole(['admin']),
    accountController.getAccounts
);
router.get(
    '/accounts/create',
    checkRole(['admin']),
    accountController.formCreate
);
router.post(
    '/accounts/create',
    checkRole(['admin']),
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