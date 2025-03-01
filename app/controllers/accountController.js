const accountController = {
    getAccounts: async (req, res) => {
        try {
            res.render('account/index', {
                title: 'Accounts',
                currentPage: 'accounts',
            });
        } catch (error) {
            console.error('customers Error:', error);
            res.status(500).render('error', {
                message: 'Error loading accounts',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    },

    createAccount: async (req, res) => {
        try {
            res.render('account/create', {
                title: 'Account Create',
                currentPage: 'account create',
            });
        } catch (error) {
            console.error('customers Error:', error);
            res.status(500).render('error', {
                message: 'Error loading account create',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    },
};

module.exports = accountController;