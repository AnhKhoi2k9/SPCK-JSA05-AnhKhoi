// Lấy sách mới từ Open Library API (ví dụ: theo từ khóa "2024" hoặc "new")
async function fetchNewBooks() {
  // Bạn có thể thay đổi từ khóa tìm kiếm bên dưới cho phù hợp
  const res = await fetch('https://openlibrary.org/search.json?q=2024&limit=8');
  const data = await res.json();
  return data.docs;
}

// Hiển thị popup thông tin sách
function showBookInfo(book, coverUrl, price) {
  let popup = document.getElementById('book-info-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'book-info-popup';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.background = '#fff';
    popup.style.padding = '24px';
    popup.style.borderRadius = '12px';
    popup.style.boxShadow = '0 4px 24px rgba(0,0,0,0.2)';
    popup.style.zIndex = 9999;
    popup.style.maxWidth = '90vw';
    popup.style.maxHeight = '90vh';
    popup.style.overflowY = 'auto';
    document.body.appendChild(popup);
  }
  popup.innerHTML = `
    <button id="close-book-info-popup" style="float:right;font-size:20px;background:none;border:none;cursor:pointer;">&times;</button>
    <div style="text-align:center">
      <img src="${coverUrl}" alt="${book.title}" style="width:160px;height:220px;object-fit:cover;border-radius:8px;margin-bottom:12px;">
      <h2>${book.title}</h2>
      <p><b>Tác giả:</b> ${book.author_name ? book.author_name.join(', ') : 'Không rõ'}</p>
      <p><b>Năm xuất bản:</b> ${book.first_publish_year || 'Không rõ'}</p>
      <p><b>Giá:</b> ${price.toLocaleString('vi-VN')}đ</p>
      <p><b>Nhà xuất bản:</b> ${book.publisher ? book.publisher.join(', ') : 'Không rõ'}</p>
      <p><b>Mô tả:</b> ${book.subject ? book.subject.slice(0, 5).join(', ') : 'Không có mô tả.'}</p>
    </div>
  `;
  document.getElementById('close-book-info-popup').onclick = () => popup.remove();
}

// Render sách mới vào new-books section
async function renderNewBooks() {
  const container = document.getElementById('new-books-list');
  if (!container) return;
  const books = await fetchNewBooks();
  container.innerHTML = '';
  books.forEach(book => {
    const coverId = book.cover_i;
    const coverUrl = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : 'assets/no-cover.png';
    const price = Math.floor(Math.random() * (300000 - 100000 + 1)) + 100000;
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book-item';
    bookDiv.innerHTML = `
      <img src="${coverUrl}" alt="${book.title}">
      <p>${book.title}</p>
      <p class="price">Giá: ${price.toLocaleString('vi-VN')}đ</p>
      <button class="add-to-cart-btn" data-name="${book.title}" data-price="${price}" data-cover-id="${coverId || ''}">
        <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
      </button>
    `;
    // Sự kiện click vào bookDiv (trừ nút thêm vào giỏ hàng)
    bookDiv.addEventListener('click', function(e) {
      if (!e.target.classList.contains('add-to-cart-btn') && !e.target.closest('.add-to-cart-btn')) {
        showBookInfo(book, coverUrl, price);
      }
    });
    container.appendChild(bookDiv);
  });
}

document.addEventListener('DOMContentLoaded', renderNewBooks);
