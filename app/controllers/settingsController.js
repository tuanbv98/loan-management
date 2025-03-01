const settingsController = {
    getSettings: async (req, res) => {
        try {
            res.render('settings/index', {
                title: 'Settings',
                currentPage: 'settings',
            });
        } catch (error) {
            console.error('customers Error:', error);
            res.status(500).render('error', {
                message: 'Error loading settings',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    },
};

module.exports = settingsController;