// Show or hidden password
const togglePassword = (fieldId) => {
    const field = document.getElementById(fieldId);
    const button = field.nextElementSibling.nextElementSibling;

    if (field.type === 'password') {
        field.type = 'text';
        button.textContent = 'Ẩn';
    } else {
        field.type = 'password';
        button.textContent = 'Hiện';
    }
}
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

const formatDate = (date) => {
    return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);
}

const calculateLoan = () => {
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const interestRate = parseFloat(document.getElementById('interest_rate').value) || 0;
    const duration = parseInt(document.getElementById('duration').value) || 0;
    const startDate = new Date(document.getElementById('start_date').value);

    const interestAmount = (amount * interestRate) / 100;
    const totalAmount = amount + interestAmount;
    const dailyPayment = totalAmount / duration;

    const dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + duration);

    document.getElementById('total_amount').textContent = formatCurrency(amount);
    document.getElementById('interest_amount').textContent = formatCurrency(interestAmount);
    document.getElementById('daily_payment').textContent = formatCurrency(dailyPayment);
    document.getElementById('due_date').textContent = formatDate(dueDate);
}

document.getElementById('start_date').valueAsDate = new Date();

document.getElementById('loanForm').addEventListener('submit', function(e) {
    e.preventDefault();
});