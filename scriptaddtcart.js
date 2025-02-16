document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const orderHistory = [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const shirtItem = event.target.closest('.shirt-item');
            const id = shirtItem.getAttribute('data-id');
            const name = shirtItem.getAttribute('data-name');
            const image = shirtItem.getAttribute('data-image');
            const price = shirtItem.getAttribute('data-price');
            const size = shirtItem.querySelector('.size-select').value;

            const shirt = {
                id,
                name,
                image,
                price,
                size
            };

            cart.push(shirt);
            updateCart();
        });
    });

    document.getElementById('cart-button').addEventListener('click', () => {
        const cartModal = document.getElementById('cart-modal');
        cartModal.style.display = 'block';
        displayCartItems();
    });

    document.getElementById('close-cart').addEventListener('click', () => {
        const cartModal = document.getElementById('cart-modal');
        cartModal.style.display = 'none';
    });

    document.getElementById('buy-now').addEventListener('click', () => {
        const paymentMethod = document.getElementById('payment-method').value;
        if (cart.length === 0) {
            alert('Your cart is empty.');
        } else {
            alert(`Purchase successful using ${paymentMethod}!`);
            orderHistory.push(...cart);
            cart.length = 0;
            updateCart();
            displayCartItems();
            const cartModal = document.getElementById('cart-modal');
            cartModal.style.display = 'none';
        }
    });

    document.getElementById('order-history-button').addEventListener('click', () => {
        const orderHistoryModal = document.getElementById('order-history-modal');
        orderHistoryModal.style.display = 'block';
        displayOrderHistoryItems();
    });

    document.getElementById('close-order-history').addEventListener('click', () => {
        const orderHistoryModal = document.getElementById('order-history-modal');
        orderHistoryModal.style.display = 'none';
    });

    function updateCart() {
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cart.length;
    }

    function displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>No items in cart.</p>';
            return;
        }

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.name}">
                    <p>${item.name}, Size: ${item.size}, Price: ₹${item.price}</p>
                </div>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', event => {
                const index = event.target.getAttribute('data-index');
                cart.splice(index, 1);
                updateCart();
                displayCartItems();
            });
        });
    }

    function displayOrderHistoryItems() {
        const orderHistoryContainer = document.getElementById('order-history-items');
        orderHistoryContainer.innerHTML = '';

        if (orderHistory.length === 0) {
            orderHistoryContainer.innerHTML = '<p>No orders placed yet.</p>';
            return;
        }

        orderHistory.forEach((item, index) => {
            const orderHistoryItem = document.createElement('div');
            orderHistoryItem.classList.add('order-history-item');
            orderHistoryItem.innerHTML = `
                <div class="order-history-item-details">
                    <img src="${item.image}" alt="${item.name}">
                    <p>${item.name}, Size: ${item.size}, Price: ₹${item.price}</p>
                </div>
            `;
            orderHistoryContainer.appendChild(orderHistoryItem);
        });
    }
});
