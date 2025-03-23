import moment from 'moment';

function closeModal() {
    const modal = document.getElementById('customerModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function openAddCustomerModal() {
    const modal = document.getElementById('customerModal');
    if (modal) {
        modal.classList.add('show');
    }
}

const dateFormat = (date, format) => {
    return moment(date).format(format ? format : 'YYYY/MM/DD');
}

module.exports = dateFormat;

// Add other client-side functions as needed