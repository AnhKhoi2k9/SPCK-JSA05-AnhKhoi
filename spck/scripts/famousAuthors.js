// Danh sách các tác giả nổi tiếng với key Open Library
const famousAuthors = [
  { name: "Nguyễn Nhật Ánh", key: "OL1394244A" },
  { name: "J.K. Rowling", key: "OL23919A" },
  { name: "George Orwell", key: "OL382982A" },
  { name: "Paulo Coelho", key: "OL216228A" },
  { name: "Dale Carnegie", key: "OL26320A" },
  { name: "Haruki Murakami", key: "OL262283A" },
  { name: "Leo Tolstoy", key: "OL34221A" },
  { name: "Gabriel García Márquez", key: "OL38298A" },
  { name: "Jane Austen", key: "OL24636A" },
  { name: "Mark Twain", key: "OL18319A" }
];

// Hàm lấy ảnh tác giả từ Open Library
function getAuthorImageUrl(authorKey) {
  // Ảnh tác giả: https://covers.openlibrary.org/a/olid/OL23919A-M.jpg
  return `https://covers.openlibrary.org/a/olid/${authorKey}-M.jpg`;
}

// Render danh sách tác giả nổi tiếng
async function renderFamousAuthors() {
  const container = document.getElementById('famous-authors-list');
  if (!container) return;
  container.innerHTML = '';
  famousAuthors.forEach(author => {
    const authorDiv = document.createElement('div');
    authorDiv.className = 'author-item';
    authorDiv.innerHTML = `
      <img src="${getAuthorImageUrl(author.key)}" alt="${author.name}" onerror="this.src='assets/no-cover.png'">
      <p>${author.name}</p>
      <button class="see-more-btn" data-name="${author.name}">Xem thêm</button>
    `;
    container.appendChild(authorDiv);
  });

  // Thêm sự kiện cho nút "Xem thêm"
  container.querySelectorAll('.see-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const name = this.getAttribute('data-name');
      window.location.href = `author.html?search=${encodeURIComponent(name)}`;
    });
  });
}

document.addEventListener('DOMContentLoaded', renderFamousAuthors);
