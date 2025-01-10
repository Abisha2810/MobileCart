let cart = [];
let total = 0;

const products = [
    { id: 1, name: 'Samsung Galaxy A35 5G', price: 16000, image: 'images/img1.jpg' },
    { id: 2, name: 'OnePlus Nord CE3 Lite 5G', price: 20000, image: 'images/img2.jpg' },
    { id: 3, name: 'Samsung Galaxy F55 5G', price: 18000, image: 'images/img3.jpg' },
    { id: 4, name: 'Samsung Galaxy F55 5G', price: 17000, image: 'images/img4.jpg' },
    { id: 5, name: 'Motorola Edge 50 Fusion 5G', price: 25000, image: 'images/img5.jpg' },
    { id: 6, name: 'Samsung Galaxy S23 FE 5G', price: 22000, image: 'images/img6.jpg' },
    { id: 7, name: 'Samsung Galaxy M33 5G', price: 19000, image: 'images/img7.jpg' },
    { id: 8, name: 'Samsung Galaxy A16 5G', price: 16000, image: 'images/img8.jpg' },
    { id: 9, name: 'Samsung Galaxy A15 5G', price: 21000, image: 'images/img9.jpg' }
];

 
function loadProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>₹${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        
        productList.appendChild(productDiv);
    });
}

 
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    total += productPrice;
    updateCart();
}


function updateCart() {
    const cartList = document.getElementById('cartList');
    const totalPrice = document.getElementById('totalPrice');
    cartList.innerHTML = '';
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ₹${item.price}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeFromCart(item);
        listItem.appendChild(removeBtn);
        cartList.appendChild(listItem);
    });
    totalPrice.textContent = total.toFixed(2);
    document.querySelector('header .cart button').textContent = `Cart (${cart.length})`;
}

 
function removeFromCart(item) {
    const index = cart.indexOf(item);
    if (index > -1) {
        cart.splice(index, 1);
        total -= item.price;
        updateCart();
    }
}

 
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
}

 
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert(`Checkout successful! Total: ₹${total.toFixed(2)}`);
        cart = [];
        total = 0;
        updateCart();
        toggleCart();
    }
}

 
function filterProducts(criteria) {
    let filteredProducts = [...products];
    if (criteria === 'priceLow') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (criteria === 'priceHigh') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else {
        filteredProducts = [...products]; // Reset filters
    }
    renderFilteredProducts(filteredProducts);
}

 
function renderFilteredProducts(filteredProducts) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>₹${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        
        productList.appendChild(productDiv);
    });
}

 
loadProducts();
