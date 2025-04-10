const { formatDate } = require('../helpers/formatDate');
const { formatCurrency } = require('../helpers/formatCurrency');
const { formatToBillion } = require('../helpers/formatToBillion');

module.exports = function(app) {
  app.locals.formatDate = formatDate;
  app.locals.formatCurrency = formatCurrency;
  app.locals.formatToBillion = formatToBillion;
};