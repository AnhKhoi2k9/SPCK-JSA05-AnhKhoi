// Lấy key sách từ URL
function getBookKeyFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('key');
}

// Hàm tạo giá ngẫu nhiên cho demo
function randomPrice() {
  return Math.floor(Math.random() * 200 + 50) * 1000; // 50.000 - 250.000
}

async function renderBookDetail() {
  const key = getBookKeyFromURL();
  if (!key) {
    document.getElementById('book-detail-container').innerHTML = '<p>Không tìm thấy sách.</p>';
    return;
  }
  try {
    const res = await fetch(`https://openlibrary.org${key}.json`);
    const data = await res.json();
    // Lấy thông tin tác giả
    let authorName = '';
    if (data.authors && data.authors[0] && data.authors[0].author && data.authors[0].author.key) {
      const authorRes = await fetch(`https://openlibrary.org${data.authors[0].author.key}.json`);
      const authorData = await authorRes.json();
      authorName = authorData.name;
    }
    // Lấy ảnh bìa
    let cover = data.covers && data.covers.length > 0 ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` : 'assets/no-cover.png';
    // Giá demo
    const price = randomPrice();
    // Render phần chính
    document.getElementById('book-detail-container').innerHTML = `
      <div class="book-cover">
        <img src="${cover}" alt="${data.title}" />
      </div>
      <div class="book-main-info">
        <div class="book-title">${data.title}</div>
        <div class="book-author">Tác giả: <b>${authorName || 'Không rõ'}</b></div>
        <div class="book-price">${price.toLocaleString('vi-VN')}đ</div>
        <button class="buy-now-btn" id="buy-now-btn">Mua ngay</button>
        <div class="ecom-btns">
          <a href="#" title="Tiki"><i class="fa-solid fa-heart"></i></a>
          <a href="#" title="Shopee"><i class="fa-solid fa-store"></i></a>
        </div>
        <div class="book-info-table">
          <ul>
            <li><span>Tác giả</span><span><b>${authorName || 'Không rõ'}</b></span></li>
            <li><span>Nhà xuất bản</span><span>${data.publishers ? data.publishers[0] : 'Không rõ'}</span></li>
            <li><span>Số trang</span><span>${data.number_of_pages || 'Không rõ'}</span></li>
            <li><span>Năm xuất bản</span><span>${data.first_publish_date || data.publish_date || 'Không rõ'}</span></li>
            <li><span>Ngôn ngữ</span><span>${data.languages && data.languages[0] ? data.languages[0].key.replace('/languages/', '').toUpperCase() : 'Không rõ'}</span></li>
          </ul>
        </div>
      </div>
    `;
    // Render mô tả
    document.getElementById('book-description').innerHTML = `
      <h3>Giới thiệu sách</h3>
      <div>${data.description ? (typeof data.description === 'string' ? data.description : data.description.value) : 'Không có mô tả.'}</div>
    `;
    // Xử lý nút mua ngay
    document.getElementById('buy-now-btn').onclick = function() {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' && !!localStorage.getItem('currentUser');
      if (!isLoggedIn) {
        alert('Bạn cần đăng nhập để mua hàng');
        window.location.href = 'login.html';
        return;
      }
      // Thêm vào giỏ hàng localStorage
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const exist = cart.find(item => item.key === key);
      if (exist) {
        exist.quantity += 1;
      } else {
        cart.push({
          key,
          title: data.title,
          name: data.title,
          author: authorName,
          price,
          cover,
          quantity: 1
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      // Cập nhật lại số lượng trên navbar
      const cartCount = document.getElementById('cart-count');
      if (cartCount) {
        cartCount.textContent = cart.length;
      }
      alert('Đã thêm vào giỏ hàng!');
    };
  } catch (err) {
    document.getElementById('book-detail-container').innerHTML = '<p>Lỗi khi tải dữ liệu sách.</p>';
  }
}

document.addEventListener('DOMContentLoaded', renderBookDetail); 