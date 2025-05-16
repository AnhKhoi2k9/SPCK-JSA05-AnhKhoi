// Cart functionality
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(name, price, coverId) {
        const existingItem = this.items.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                name: name,
                price: price,
                quantity: 1,
                coverId: coverId
            });
        }

        this.saveCart();
        this.updateCartCount();
    }

    removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
        this.saveCart();
        this.updateCartCount();
    }

    updateQuantity(name, quantity) {
        const item = this.items.find(item => item.name === name);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(name);
            }
        }
        this.saveCart();
        this.updateCartCount();
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.getTotalItems();
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }
}

// Initialize cart
const cart = new Cart();

// Add event listeners for all add-to-cart buttons
document.addEventListener('DOMContentLoaded', () => {
    // Add cart count badge to cart link
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        const cartCount = document.createElement('span');
        cartCount.className = 'cart-count';
        cartCount.style.display = 'none';
        cartLink.appendChild(cartCount);
    }

    // Add event listeners to all add-to-cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (!isLoggedIn) {
                e.preventDefault();
                alert('Bạn cần đăng nhập để mua hàng');
                return false;
            }
            alert('Bạn đã thêm vào giỏ hàng')
            const name = e.target.dataset.name;
            const price = parseInt(e.target.dataset.price);
            const coverId = e.target.dataset.coverId || null;
            cart.addItem(name, price, coverId);
        }
    });
});

// Hàm hiển thị giỏ hàng
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartSummary = document.getElementById('cart-summary');
  const items = cart.items;

  if (!cartItems || !cartSummary) return;

  if (items.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Giỏ hàng của bạn đang trống</div>';
    cartSummary.innerHTML = '';
    // Update cart count in navbar
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      cartCount.textContent = '0';
      cartCount.style.display = 'none';
    }
    return;
  }

  let cartHTML = '';
  let total = 0;

  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const coverId = item.coverId;
    const coverUrl = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : 'assets/no-cover.png'; // fallback local image
    cartHTML += `
      <div class="cart-item">
        <img src="${coverUrl}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x120?text=No+Cover'">
        <div class="item-details">
          <div class="item-name">${item.name}</div>
          <div class="item-price">${item.price.toLocaleString('vi-VN')}đ</div>
        </div>
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${index})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  });

  cartItems.innerHTML = cartHTML;
  cartSummary.innerHTML = `
    <div class="total-price">Tổng cộng: ${total.toLocaleString('vi-VN')}đ</div>
    <button class="checkout-btn" onclick="checkout()">Thanh Toán</button>
  `;

  // Update cart count in navbar
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
  }
}

// Hàm cập nhật số lượng sản phẩm
function updateQuantity(index, change) {
  cart.updateQuantity(cart.items[index].name, cart.items[index].quantity + change);
  renderCart();
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
  cart.removeItem(cart.items[index].name);
  renderCart();
}

// Hiển thị giỏ hàng khi tải trang
renderCart();

function checkout() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    alert('Bạn cần đăng nhập để thanh toán');
    return;
  }
  alert('Cảm ơn bạn đã mua hàng!');
  localStorage.removeItem('cart');
  renderCart();
}