const express = require('express');
const router = express.Router();

const routes = require('./dashboard');

// Middleware kiểm tra authentication
// const authMiddleware = require('../middleware/auth');

// Auth routes (không cần auth middleware)
// router.use('/auth', authRoutes);

// Routes cần authentication
// router.use(authMiddleware);

// Route
router.use('/', routes);
router.use('/customers', routes);
router.use('/settings', routes);
router.use('/loans', routes);
router.use('/reports', routes);
router.use('/accounts', routes);
router.use('/accounts/create', routes);
router.use('/login', routes);

module.exports = router;