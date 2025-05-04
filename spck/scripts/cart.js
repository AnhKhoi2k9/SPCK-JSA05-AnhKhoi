// Lấy giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Hàm hiển thị giỏ hàng
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price.toLocaleString()}đ</td>
      <td>
        <button onclick="updateQuantity(${index}, -1)">-</button>
        ${item.quantity}
        <button onclick="updateQuantity(${index}, 1)">+</button>
      </td>
      <td>${itemTotal.toLocaleString()}đ</td>
      <td><button class="remove-btn" onclick="removeFromCart(${index})">Xóa</button></td>
    `;
    cartItems.appendChild(row);
  });

  cartTotal.textContent = `${total.toLocaleString()}đ`;
}

// Hàm cập nhật số lượng sản phẩm
function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Hiển thị giỏ hàng khi tải trang
renderCart();