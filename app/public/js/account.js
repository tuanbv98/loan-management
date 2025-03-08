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