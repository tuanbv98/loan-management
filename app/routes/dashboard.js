const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/checkRole');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const customerController = require('../controllers/customerController');
const settingsController = require('../controllers/settingsController');
const loanController = require('../controllers/loanController');
const reportsController = require('../controllers/reportController');
const accountController = require('../controllers/accountController');
const authController = require('../controllers/authController');
const path = require('path');
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: './app/public/uploads/id-cards',
        filename: function(req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    })
});

// Login
router.get('/login', authController.showLoginForm);
router.post('/login', authController.login);

router.get('/401', authController.showUnauthorized);

// Dashboard
router.get(
    '/',
    auth.verifyToken,
    auth.checkRole(['admin', 'user']),
    dashboardController.getDashboard
);
router.get(
    '/logout',
    auth.verifyToken,
    auth.checkRole(['admin', 'user']),
    dashboardController.logout
);

// Customers
router.get(
    '/customers',
    auth.verifyToken,
    auth.checkRole(['admin', 'user']),
    customerController.getCustomers
);
router.post(
    '/customers',
    auth.verifyToken,
    auth.checkRole(['admin', 'user']),
    customerController.getCustomers
);
router.get(
    '/customers/create',
    auth.verifyToken,
    auth.checkRole(['admin', 'user']),
    customerController.formCreate
);
router.get(
    '/customers/:id',
    auth.verifyToken,
    auth.checkRole(['admin', 'user']),
    customerController.detailCustomer
);
router.post(
    '/customers/create',
    upload.fields([
        { name: 'id_card_front', maxCount: 1 },
        { name: 'id_card_back', maxCount: 1 }
    ]),
    auth.verifyToken,
    auth.checkRole(['admin', 'user']),
    [
        body('full_name').notEmpty().withMessage('Vui lòng nhập họ và tên khách hàng'),
        body('email').isEmail().withMessage('Vui lòng nhập đúng định dạng email khách hàng'),
    ],
    customerController.createCustomer
);

// Loan
router.get(
    '/loans',
    auth.verifyToken,
    auth.checkRole(['admin', 'user']),
    loanController.getLoans
);
router.get(
    '/loans/create',
    auth.verifyToken,
    auth.checkRole(['admin', 'user']),
    loanController.formAdd
);
router.post(
    '/loans/create',
    auth.verifyToken,
    auth.checkRole(['admin', 'user']),
    loanController.addLoan
);

// Customers
router.get(
    '/customers/create/:id',
    auth.verifyToken,
    auth.checkRole(['admin', 'user']),
    loanController.formCreate
);
router.post(
    '/customers/create/:id',
    auth.verifyToken,
    auth.checkRole(['admin', 'user']),
    loanController.createLoanFollowCustomer
);

// Settings
router.get(
    '/settings',
    auth.verifyToken,
    auth.checkRole(['admin', 'user']),
    settingsController.getSettings
);

// Reports
router.get(
    '/reports',
    auth.verifyToken,
    auth.checkRole(['admin', 'user']),
    reportsController.getReports
);

// Accounts
router.get(
    '/accounts',
    auth.verifyToken,
    auth.checkRole(['admin']),
    accountController.getAccounts
);
router.post(
    '/accounts',
    auth.verifyToken,
    auth.checkRole(['admin']),
    accountController.getAccounts
);
router.get(
    '/accounts/create',
    auth.verifyToken,
    auth.checkRole(['admin']),
    accountController.formCreate
);
router.post(
    '/accounts/create',
    auth.verifyToken,
    auth.checkRole(['admin']),
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
router.get(
    '/accounts/:id',
    auth.verifyToken,
    auth.checkRole(['admin']),
    accountController.accountDetail
);
router.post(
    '/accounts/:id',
    auth.verifyToken,
    auth.checkRole(['admin']),
    accountController.accountEdit
);

module.exports = router;