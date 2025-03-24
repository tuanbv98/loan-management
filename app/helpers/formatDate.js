const moment = require("moment");

const formatDate = (date, format) => {
  return moment(date).format(format ? format : 'YYYY-MM-DD');
};

module.exports = {
  formatDate
};