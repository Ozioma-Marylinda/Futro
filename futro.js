import {cart, addToCart} from '../data/cart.js';
import {productsthreeContainer} from '../data/products.js';
import {basketContainer} from '../data/products.js';

let productsthreeHTML =``;

productsthreeContainer.forEach((product) => {
  productsthreeHTML += `
    <div class="productsthreeContainer">
        <img class="productsthreeContainer-image" 
         src="${product.image}">
        <div class="productsthreeContainer-name">${product.name}</div>
        <div class="productsthreeContainer-size">${product.size}</div>
        <div class="productsthreeContainer-price">${product.price}</div>
        <button class="add-to-cart js-add-to-cart" data-product-id="${product.id}">
        Add to cart</button>
    </div>    
  `;
})

document.querySelector('.js-productsthree').innerHTML = productsthreeHTML;

let basketHTML =``;

basketContainer.forEach((product) => {
  basketHTML += `
    <div class="basketContainer">
        <div class="basket-name">${product.name}</div>
        <img class="basket-image" 
         src="${product.image}">
        <div class="basket-price">${product.price}</div>
        <button class="add-to-cart js-add-to-cart" data-product-id="${product.id}">
        Add to cart</button>
    </div>    
  `;
})

document.querySelector('.js-basket').innerHTML = basketHTML;


function updateCartQuantity() {
  let cartQuantity = 0;

   cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
     });

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity()
    });
   });