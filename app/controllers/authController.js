const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;

const authController = {
  showLoginForm: async (_, res) => {
    res.render('login', {
      title: 'Login',
      currentPage: 'login',
    });
  },

  login: async (req, res) => {
    const { user_name, password } = req.body;

    try {
      const user = await User.findOne({ where: { user_name } });
      console.log("user: ", user);

      if (!user) return res.render("login", { error: "Tên đăng nhập không tồn tại!" });

      const isMatch = bcrypt.compareSync(
        password,
        user.password_hash
      );
      if (!isMatch) return res.render("login", { error: "Mật khẩu không đúng!" });

      req.session.user = { id: user.id, user_name: user.user_name, role: user.role };
      res.redirect("/");
    } catch (error) {
      res.render("login", { error: "Lỗi đăng nhập!" });
    }
  },

  showUnauthorized: async (_, res) => {
    res.render('401', {
      title: 'Unauthorized',
      currentPage: 'Unauthorized',
    });
  },
};

module.exports = authController;
