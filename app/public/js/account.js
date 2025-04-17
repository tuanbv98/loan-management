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

    // Số tiền phải trả trong 40 ngày
    const paidAmount = parseInt(interestRate*amount) + parseInt(amount);
    // Số tiền 7 ngày đầu
    const amountOfSevenDay = Math.round((paidAmount / 40) * 7);
    // Số tiền nhận về
    const amountReceived = parseInt(paidAmount - amountOfSevenDay);
    // Số tiền mỗi ngày phải trả
    const dayPayment = Math.round(amountReceived / 40);

    const dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + duration);

    document.getElementById('total_amount').textContent = formatCurrency(paidAmount);
    document.getElementById('interest_amount').textContent = formatCurrency(amountReceived);
    document.getElementById('daily_payment').textContent = formatCurrency(dayPayment);
    document.getElementById('due_date').textContent = formatDate(dueDate);
}

const previewImage = (input, previewId) => {
    const preview = document.getElementById(previewId);
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            preview.style.backgroundImage = `url(${e.target.result})`;
            preview.style.display = 'block';
            input.parentElement.querySelector('.upload-content').style.display = 'none';
        }

        reader.readAsDataURL(file);
    }
}

// document.getElementById('start_date').valueAsDate = new Date();

// document.getElementById('loanForm').addEventListener('submit', function(e) {
//     e.preventDefault();
// });