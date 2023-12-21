//products


const products = [
  { id: 1, name: 'iphone 14', price: 1999.9, img: 'https://s3.zoommer.ge/zoommer-images/thumbs/0182335_apple-iphone-14-pro-128gb-deep-purple_550.jpeg' },
  { id: 2, name: 'Lenovo Legion 9 ', price: 4229.99, img: 'https://alta.ge/images/detailed/303/Legion_9_16IRX8_CT1_03__1_.png' },
  { id: 3, name: 'iphone 12', price: 439.99, img: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphone-12-pro-max-gold-2020?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1635202937000' },
  { id: 4, name: 'iphone 13', price: 539.99, img: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphone-13-pro-max-gold-2023?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1679072988850' },
  { id: 5, name: 'iphone 11', price: 319.99, img: 'https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-11-pro-max/iphone-11-pro-max-silver.jpg' },
  { id: 1, name: 'iphone 14', price: 1999.9, img: 'https://s3.zoommer.ge/zoommer-images/thumbs/0182335_apple-iphone-14-pro-128gb-deep-purple_550.jpeg' },
  { id: 2, name: 'Lenovo Legion 9 ', price: 4229.99, img: 'https://alta.ge/images/detailed/303/Legion_9_16IRX8_CT1_03__1_.png' },
  { id: 3, name: 'iphone 12', price: 439.99, img: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphone-12-pro-max-gold-2020?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1635202937000' },
  { id: 4, name: 'iphone 13', price: 539.99, img: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphone-13-pro-max-gold-2023?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1679072988850' },
  { id: 5, name: 'iphone 11', price: 319.99, img: 'https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-11-pro-max/iphone-11-pro-max-silver.jpg' },
];

let basket = [];

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img class="product-img" src="${product.img}" alt="">
      <div class="product-name">${product.name}</div>
      <div class="product-price">$${product.price.toFixed(2)}</div>
      <button class="buy-btn" onclick="addToBasket(${product.id})">Add to Basket</button>
    `;
  return card;
}

function addToBasket(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    const existingItem = basket.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      basket.push({ img: product.img, id: product.id, name: product.name, price: product.price, quantity: 1 });
    }
    updateBasket();
  }
}

function updateBasket() {
  const basketItemsContainer = document.getElementById('basket-items');
  const totalPriceElement = document.getElementById('total-price');
  basketItemsContainer.innerHTML = '';
  let totalPrice = 0;

  basket.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'basket-item';
    itemDiv.innerHTML = `
      <img class="product-img-basket" src="${item.img}" alt="">
        <div class="item-name">${item.name}</div>
        <div class="item-actions">
          <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
          <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
        </div>
      `;
    basketItemsContainer.appendChild(itemDiv);
    totalPrice += item.price * item.quantity;
  });

  totalPriceElement.textContent = totalPrice.toFixed(2);
}

function increaseQuantity(productId) {
  const existingItem = basket.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
    updateBasket();
  }
}

function decreaseQuantity(productId) {
  const existingItem = basket.find(item => item.id === productId);
  if (existingItem && existingItem.quantity > 1) {
    existingItem.quantity -= 1;
    updateBasket();
  }
}

function deleteItem(productId) {
  const index = basket.findIndex(item => item.id === productId);
  if (index !== -1) {
    basket.splice(index, 1);
    updateBasket();
  }
}

function deleteAllItems() {
  basket = [];
  updateBasket();
}

function toggleBasket() {
  const basketModal = document.getElementById('basket-modal');
  basketModal.style.display = (basketModal.style.display === 'flex') ? 'none' : 'flex';
}

function checkout() {
  // Simulate checkout process
  alert('First Sign in !');
  basket = [];
  toggleBasket();
}

function searchProducts() {
  const searchInput = document.getElementById('search-bar');
  const searchTerm = searchInput.value.toLowerCase();

  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));

  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = '';

  filteredProducts.forEach(product => {
    const card = createProductCard(product);
    productContainer.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const productContainer = document.getElementById('product-container');
  products.forEach(product => {
    const card = createProductCard(product);
    productContainer.appendChild(card);
  });
});



