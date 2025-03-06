const express = require('express');
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

// Loan
router.get('/loans', loanController.getLoans);

// Settings
router.get('/settings', settingsController.getSettings);

// Reports
router.get('/reports', reportsController.getReports);

// Accounts
router.get('/accounts', accountController.getAccounts);
router.get('/accounts/create', accountController.createAccount);

module.exports = router;