const dashboardController = {
  getDashboard: async (req, res) => {
    try {
      res.render('dashboard/index', {
        title: 'Dashboard',
        currentPage: 'dashboard',
        sessionData: req.session.user,
      });
    } catch (error) {
      console.error('Dashboard Error:', error);
      res.status(500).render('error', {
        message: 'Error loading dashboard',
        error: process.env.NODE_ENV === 'development' ? error : {}
      });
    }
  },

  logout: async (req, res) => {
    try {
      req.session = null;
      return res.redirect("/login");
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).render('error', {
        message: 'Error loading login',
        error: process.env.NODE_ENV === 'development' ? error : {}
      });
    }
  },
};

module.exports = dashboardController;
