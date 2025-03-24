const { formatDate } = require('../helpers/formatDate');

module.exports = function(app) {
  app.locals.formatDate = formatDate;
};