const customerController = {
    getCustomers: async (req, res) => {
        try {
            res.render('customers/index', {
                title: 'Customers',
                currentPage: 'customers',
            });
        } catch (error) {
            console.error('customers Error:', error);
            res.status(500).render('error', {
                message: 'Error loading customers',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    },
};

module.exports = customerController;