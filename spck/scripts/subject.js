// Lấy subject từ URL
function getSubjectFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('subject');
}

function subjectToTitle(subject) {
  const map = {
    'modern_literature': 'Văn học hiện đại',
    'classic_literature': 'Văn học kinh điển',
    'science_fiction': 'Khoa học viễn tưởng',
    'detective': 'Trinh thám - Kinh dị',
    'children': 'Sách thiếu nhi',
    'personal_development': 'Sách kỹ năng',
  };
  return map[subject] || subject;
}

async function renderSubjectBooks() {
  const subject = getSubjectFromURL();
  if (!subject) {
    document.getElementById('subject-title').innerText = 'Không tìm thấy thể loại';
    return;
  }
  document.getElementById('subject-title').innerText = subjectToTitle(subject);
  const booksContainer = document.getElementById('subject-books');
  booksContainer.innerHTML = '<p>Đang tải...</p>';
  try {
    const res = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=24`);
    const data = await res.json();
    if (!data.works || data.works.length === 0) {
      booksContainer.innerHTML = '<p>Không có sách nào cho thể loại này.</p>';
      return;
    }
    booksContainer.innerHTML = data.works.map(book => {
      const cover = book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg` : 'assets/no-cover.png';
      return `
        <div class="book-card">
          <img src="${cover}" alt="${book.title}" />
          <div class="book-info">
            <h3>${book.title}</h3>
            <p>Tác giả: ${(book.authors && book.authors[0]) ? book.authors[0].name : 'Không rõ'}</p>
            <a href="book.html?key=${book.key}" class="see-more-btn">Xem chi tiết</a>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    booksContainer.innerHTML = '<p>Lỗi khi tải dữ liệu.</p>';
  }
}

document.addEventListener('DOMContentLoaded', renderSubjectBooks); 