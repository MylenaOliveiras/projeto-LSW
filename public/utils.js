export function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartItemCount();
}

export function updateCartItemCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemCountElement = document.getElementById("cart-item-count");
  if (cartItemCountElement) {
    cartItemCountElement.textContent = cart.length;
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  updateCartItemCount();
});
