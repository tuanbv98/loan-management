const loanController = {
    getReports: async (req, res) => {
        try {
            res.render('report/index', {
                title: 'Report',
                currentPage: 'report',
            });
        } catch (error) {
            console.error('customers Error:', error);
            res.status(500).render('error', {
                message: 'Error loading report',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    },
};

module.exports = loanController;