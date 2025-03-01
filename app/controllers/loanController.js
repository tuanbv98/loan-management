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
};

module.exports = loanController;