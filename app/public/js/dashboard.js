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

// Add other client-side functions as needed