function addProductToCart(productId, productName, productPrice, button) {
    const quantityDisplay = button.parentElement.querySelector('.quantity-display');
    const quantity = parseInt(quantityDisplay.textContent);

    
    const price = parseFloat(productPrice);
    if (isNaN(price)) {
        console.error('Preço inválido:', productPrice);
        return;
    }

    const product = {
        productId,
        productName,
        productPrice: price, 
        quantity
    };

    addToCart(product);
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    if (!Array.isArray(cart)) {
        console.error('Carrinho inválido:', cart);
        return;
    }
    const cartCount = cart.reduce((count, item) => count + (item.quantity || 0), 0);
    console.log('Itens no carrinho:', cartCount);
    document.getElementById('cart-count').textContent = cartCount;
}

function addToCart(product) {
    console.log('Produto recebido:', product);
    if (!product.productId || !product.productName || !product.productPrice || !product.quantity) {
        console.error('Produto inválido:', product);
        return;
    }

    const existingProduct = cart.find(item => item.productId === product.productId);

    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push({
            productId: product.productId,
            productName: product.productName,
            productPrice: product.productPrice,
            quantity: product.quantity
        });
    }

    saveCart();

    updateCartCount();

}

function saveCart() {
    if (!Array.isArray(cart)) {
        console.error('Carrinho inválido:', cart);
        return;
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log('salvou');
}

function loadCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = ''; 
    let total = 0;

    if (!cart || cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        cartTotalElement.textContent = '0.00';
        return;
    }

    cart.forEach(item => {
        console.log(item.quantity);
        console.log(item.productPrice);
        const subtotal = item.quantity * item.productPrice;

        if (isNaN(subtotal)) {
            console.error('Subtotal inválido para o produto', item);
        }

        total += subtotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item mb-3';
        itemElement.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>
                    <h5>${item.productName}</h5>
                    <p>Preço Unitário: r$${item.productPrice.toFixed(2)}</p>
                    <p>Quantidade: ${item.quantity}</p>
                </div>
                <div>
                    <p>Subtotal: r$${subtotal.toFixed(2)}</p>
                    <button class="btn btn-danger btn-sm remove-item" data-id="${item.productId}">Remover</button>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(itemElement);
    });

    if (isNaN(total)) {
        console.error('Total inválido:', total);
    }

    cartTotalElement.textContent = total.toFixed(2);

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            removeFromCart(productId);
        });
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    cart = storedCart ? JSON.parse(storedCart) : [];
}

document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    updateCartCount();

    if (document.getElementById('cart-items')) {
        loadCart();
    }
});