const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require("path");
const routes = require('./app/routes');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// database
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync();

// Make session available in all views (including layouts)
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Use layout login
app.use('/login', (_, res, next) => {
  res.locals.layout = 'login';
  next();
});

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'app/public')));

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    message: 'Something broke!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
// app.use((req, res) => {
//   res.status(404).render('404');
// });

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
