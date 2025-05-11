// Lấy sách nổi bật từ Open Library API (ví dụ: bestsellers hoặc theo từ khóa)
async function fetchBooks() {
  // Bạn có thể thay đổi từ khóa tìm kiếm bên dưới
  const res = await fetch('https://openlibrary.org/search.json?q=harry+potter&limit=8');
  const data = await res.json();
  return data.docs;
}

// Render các slide sách vào carousel
async function renderCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;
  const books = await fetchBooks();
  track.innerHTML = '';
  books.forEach(book => {
    const coverId = book.cover_i;
    const coverUrl = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : 'assets/no-cover.png';
    const li = document.createElement('li');
    li.className = 'carousel-slide';
    li.innerHTML = `
      <img src="${coverUrl}" alt="${book.title}">
      <p>${book.title}</p>
    `;
    track.appendChild(li);
  });

  // Sau khi render xong, khởi tạo lại carousel
  initCarousel();
}

// Logic lướt carousel
function initCarousel() {
  const track = document.getElementById('carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-btn.next');
  const prevButton = document.querySelector('.carousel-btn.prev');
  let currentSlideIndex = 0;

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
  }

  function moveToNextSlide() {
    if (currentSlideIndex < slides.length - 1) {
      currentSlideIndex++;
    } else {
      currentSlideIndex = 0;
    }
    updateCarousel();
  }

  function moveToPrevSlide() {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
    } else {
      currentSlideIndex = slides.length - 1;
    }
    updateCarousel();
  }

  nextButton.onclick = moveToNextSlide;
  prevButton.onclick = moveToPrevSlide;

  // Tự động chuyển động carousel
  if (window.carouselInterval) clearInterval(window.carouselInterval);
  window.carouselInterval = setInterval(moveToNextSlide, 3000);

  // Đảm bảo hiển thị đúng slide đầu tiên khi render lại
  currentSlideIndex = 0;
  updateCarousel();
}

document.addEventListener('DOMContentLoaded', renderCarousel);