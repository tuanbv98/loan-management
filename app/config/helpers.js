const { formatDate } = require('../helpers/formatDate');
const { formatCurrency } = require('../helpers/formatCurrency');

module.exports = function(app) {
  app.locals.formatDate = formatDate;
  app.locals.formatCurrency = formatCurrency;
};