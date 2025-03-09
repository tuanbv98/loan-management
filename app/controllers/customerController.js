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

  formCreate: async (req, res) => {
    try {
      res.render('customers/create', {
        errors: [],
        oldData: {}
      });
    } catch (error) {
      res.status(500).render('error', {
        message: 'Error loading custome create',
        error: process.env.NODE_ENV === 'development' ? error : {}
      });
    }
  },

  createCustome: async (req, res) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        return res.render('customers/create', {
          errors: errors.array(),
          oldData: req.body
        });
      }

      return res.render("customers/index", { message: "Đăng ký tài khoản thành công." })

    } catch (error) {
      res.render("customers/create", {
        error: error,
        errors: [],
        oldData: {}
      });
    }
  },
};

module.exports = customerController;