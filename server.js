const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require("path");

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

app.set("view engine", "ejs");

// Set views directory explicitly (ensure correct path)
app.set("views", path.join(__dirname, "app/views"));


// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// Serve static files from the public directory
app.use(express.static('app/public'));

// Serve static files
app.use(express.static('app/views'));

// Routes
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/views', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/views', 'dashboard.html'));
});

app.get('/customers', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/views', 'customer.html'));
});

app.get('/customers/new', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/views', 'new-customer.html'));
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
