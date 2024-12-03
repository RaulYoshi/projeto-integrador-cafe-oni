function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}









