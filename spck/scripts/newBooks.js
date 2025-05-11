// Lấy sách mới từ Open Library API (ví dụ: theo từ khóa "2024" hoặc "new")
async function fetchNewBooks() {
  // Bạn có thể thay đổi từ khóa tìm kiếm bên dưới cho phù hợp
  const res = await fetch('https://openlibrary.org/search.json?q=2024&limit=8');
  const data = await res.json();
  return data.docs;
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
    container.appendChild(bookDiv);
  });
}

document.addEventListener('DOMContentLoaded', renderNewBooks);
