const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
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

      if (!user) return res.render("login", { error: "Tên đăng nhập không tồn tại!" });

      const isMatch = bcrypt.compareSync(
        password,
        user.password_hash
      );
      if (!isMatch) return res.render("login", { error: "Mật khẩu không đúng!" });

      const token = jwt.sign(
        { id: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400,
        }
      );

      req.session.token = token;
      req.session.user = {
        id: user.id,
        user_name: user.user_name,
        role: user.role,
        spam_zalo: user.spam_zalo,
        spam_icloud: user.spam_icloud
      };
      res.redirect("/");
    } catch (error) {
      console.log('error: ', error);
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
