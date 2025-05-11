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

function getAuthorImageUrl(authorKey) {
  return `https://covers.openlibrary.org/a/olid/${authorKey}-M.jpg`;
}

// Lấy thông tin tác giả và tác phẩm tiêu biểu từ Open Library
async function fetchAuthorDetail(authorKey) {
  const infoRes = await fetch(`https://openlibrary.org/authors/${authorKey}.json`);
  const info = await infoRes.json();

  let bio = '';
  if (typeof info.bio === 'string') {
    bio = info.bio;
  } else if (info.bio && info.bio.value) {
    bio = info.bio.value;
  }

  // Lấy 5 tác phẩm tiêu biểu
  const worksRes = await fetch(`https://openlibrary.org/authors/${authorKey}/works.json?limit=5`);
  const worksData = await worksRes.json();
  const works = (worksData.entries || []).map(w => w.title);

  return { bio, works };
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
      <button class="see-more-btn" data-key="${author.key}" data-name="${author.name}">Xem thêm</button>
    `;
    container.appendChild(authorDiv);
  });

  // Thêm sự kiện cho nút "Xem thêm"
  container.querySelectorAll('.see-more-btn').forEach(btn => {
    btn.addEventListener('click', async function() {
      const key = this.getAttribute('data-key');
      const name = this.getAttribute('data-name');
      // Lấy dữ liệu từ Open Library
      const detail = await fetchAuthorDetail(key);

      // Hiển thị popup hoặc section thông tin
      showAuthorPopup({
        name,
        image: getAuthorImageUrl(key),
        bio: detail.bio,
        works: detail.works
      });
    });
  });
}

// Hàm hiển thị popup hoặc section thông tin tác giả (dịch tiếng Việt)
function showAuthorPopup({ name, image, bio, works }) {
  // Nếu chưa có, tạo popup
  let popup = document.getElementById('author-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'author-popup';
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
    popup.innerHTML = `<button id="close-author-popup" style="float:right;font-size:20px;background:none;border:none;cursor:pointer;">&times;</button>`;
    document.body.appendChild(popup);
    document.getElementById('close-author-popup').onclick = () => popup.remove();
  } else {
    popup.innerHTML = `<button id="close-author-popup" style="float:right;font-size:20px;background:none;border:none;cursor:pointer;">&times;</button>`;
    document.getElementById('close-author-popup').onclick = () => popup.remove();
  }

  popup.innerHTML += `
    <div style="text-align:center">
      <img src="${image}" alt="${name}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;margin-bottom:12px;">
      <h2>${name}</h2>
      <p style="margin-bottom:12px;"><b>Giới thiệu:</b> ${bio ? bio : 'Không có thông tin.'}</p>
      <h4>Các tác phẩm tiêu biểu:</h4>
      <ul style="text-align:left;display:inline-block;">
        ${works.length ? works.map(w => `<li>${w}</li>`).join('') : '<li>Không có dữ liệu</li>'}
      </ul>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', renderFamousAuthors);
