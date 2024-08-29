document.addEventListener('DOMContentLoaded', () => {
    // Sample data for cart items
    const cartItems = [
        { id: 1, name: 'Shoes', price: 10.00, quantity: 2 },
        { id: 2, name: 'Sunglasses', price: 5.00, quantity: 1 },
        { id: 3, name: 'T-shirt', price: 10.00, quantity: 2 },
        { id: 4, name: 'Diamond Watch by GoMyWatch', price: 50.00, quantity: 5 }
    ];

    // Function to render items
    function renderItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.innerHTML = `
                <span class="item-name">${item.name}</span>
                <div class="item-actions">
                    <span class="item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </span>
                    <button class="item-heart" data-id="${item.id}"><i class="fas fa-heart"></i></button>
                    <button class="item-delete" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
        updateTotalPrice();
    }

    // Function to update total price
    function updateTotalPrice() {
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        document.getElementById('total').textContent = total.toFixed(2);
    }

    // Event delegation for dynamic elements
    document.getElementById('cart-items').addEventListener('click', (e) => {
        const target = e.target;
        const id = parseInt(target.closest('button').dataset.id);
        const item = cartItems.find(i => i.id === id);

        if (target.classList.contains('quantity-btn')) {
            if (target.classList.contains('plus')) {
                item.quantity++;
            } else if (target.classList.contains('minus')) {
                if (item.quantity > 1) item.quantity--;
            }
            renderItems();
        } else if (target.classList.contains('item-delete')) {
            const index = cartItems.indexOf(item);
            if (index > -1) cartItems.splice(index, 1);
            renderItems();
        } else if (target.classList.contains('item-heart')) {
            target.classList.toggle('liked');
        }
    });

    // Initial render
    renderItems();
});
