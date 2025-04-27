// Hàm hiển thị thông tin tác giả
function showAuthorInfo(name, description) {
    const authorInfo = document.getElementById('author-info');
    const authorName = document.getElementById('author-name');
    const authorDescription = document.getElementById('author-description');
  
    // Cập nhật nội dung
    authorName.textContent = name;
    authorDescription.textContent = description;
  
    // Hiển thị phần thông tin tác giả
    authorInfo.style.display = 'block';
  }