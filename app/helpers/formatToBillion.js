const formatToBillion = (amount) => {
  return (amount / 1_000_000_000).toFixed(2);
}

module.exports = {
  formatToBillion
};