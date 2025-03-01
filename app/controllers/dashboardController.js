const dashboardController = {
    getDashboard: async (req, res) => {
        try {
            res.render('dashboard/index', {
                title: 'Dashboard',
                currentPage: 'dashboard',
            });
        } catch (error) {
            console.error('Dashboard Error:', error);
            res.status(500).render('error', {
                message: 'Error loading dashboard',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    },
};

module.exports = dashboardController;