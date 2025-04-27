const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');

let currentSlideIndex = 0;

// Hàm cập nhật vị trí carousel
function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
}

// Chuyển đến slide tiếp theo
function moveToNextSlide() {
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
  } else {
    currentSlideIndex = 0; // Quay lại slide đầu tiên
  }
  updateCarousel();
}

// Chuyển đến slide trước đó
function moveToPrevSlide() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
  } else {
    currentSlideIndex = slides.length - 1; // Quay lại slide cuối cùng
  }
  updateCarousel();
}

// Thêm sự kiện cho nút điều hướng
nextButton.addEventListener('click', moveToNextSlide);
prevButton.addEventListener('click', moveToPrevSlide);

// Tự động chuyển động carousel
setInterval(moveToNextSlide, 3000); // Chuyển slide sau mỗi 3 giây