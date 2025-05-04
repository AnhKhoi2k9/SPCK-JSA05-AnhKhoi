// Kho dữ liệu chứa thông tin các tác giả
const authors = {
  "Nguyễn Nhật Ánh": {
    description: "Nguyễn Nhật Ánh là một nhà văn nổi tiếng của Việt Nam, chuyên viết truyện cho thiếu nhi và thanh thiếu niên.",
    image: "https://vcdn1-giaitri.vnecdn.net/2022/01/14/nguyen-nhat-anh-1-1642147020-8611-1642148269.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=PdHfC3j8U4t4Z1ekJj21zw"
  },
  "J.K. Rowling": {
    description: "J.K. Rowling là tác giả của bộ truyện Harry Potter nổi tiếng trên toàn thế giới.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl5OdAFDjJJLfItn5I-mYZAIyNZzVA9kDKRQ&s"
  },
  "George Orwell": {
    description: "George Orwell là tác giả của các tác phẩm kinh điển như 1984 và Animal Farm.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk1I31raDp6qGl54UpXC08N4tkQ7fZnEKlaA&s"
  },
  "Paulo Coelho": {
    description: "Paulo Coelho là tác giả của cuốn sách nổi tiếng Nhà Giả Kim.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW49SsVG8RTA4o1bl0RQDJJSontishZ2mbnQ&s"
  },
  "Dale Carnegie": {
    description: "Dale Carnegie là tác giả của cuốn sách Đắc Nhân Tâm, một trong những cuốn sách bán chạy nhất mọi thời đại.",
    image: "https://nguoinoitieng.tv/images/nnt/85/0/a3hj.jpg"
  },
  "Haruki Murakami": {
    description: "Haruki Murakami là một nhà văn Nhật Bản nổi tiếng với các tác phẩm như Rừng Nauy và Kafka Bên Bờ Biển.",
    image: "https://bookish.vn/wp-content/uploads/2020/03/haruki-murakami-time-100-2015-1.jpg"
  },
  "Leo Tolstoy": {
    description: "Leo Tolstoy là một nhà văn Nga nổi tiếng với các tác phẩm kinh điển như Chiến Tranh và Hòa Bình và Anna Karenina.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjuUnP-d1dIYtbGFnAT4q89iXzXzpDTEeBQQ&s"
  },
  "Gabriel García Márquez": {
    description: "Gabriel García Márquez là một nhà văn Colombia, tác giả của tác phẩm Trăm Năm Cô Đơn.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Gabriel_Garcia_Marquez.jpg"
  },
  "Jane Austen": {
    description: "Jane Austen là một nhà văn Anh nổi tiếng với các tác phẩm như Kiêu Hãnh và Định Kiến.",
    image: "https://cdn.britannica.com/12/172012-050-DAA7CE6B/Jane-Austen-Cassandra-engraving-portrait-1810.jpg"
  },
  "Mark Twain": {
    description: "Mark Twain là một nhà văn Mỹ nổi tiếng với các tác phẩm như Những Cuộc Phiêu Lưu của Tom Sawyer và Huckleberry Finn.",
    image: "https://vcdn1-giaitri.vnecdn.net/2015/05/06/A-1-4912-1430878417.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=9-lFFwJckErPA0flDIkS6Q"
  }
};

// Hàm hiển thị thông tin tác giả
function showAuthorInfo(name) {
    const authorInfo = document.getElementById('author-info');
    const authorName = document.getElementById('author-name');
    const authorDescription = document.getElementById('author-description');
const authorImage = document.getElementById('author-image');

  // Lấy thông tin tác giả từ kho dữ liệu
  const author = authors[name];
  
if (author) {
    // Cập nhật nội dung
    authorName.textContent = name;
    authorDescription.textContent = author.description;
authorImage.src = author.image;
  
    // Hiển thị phần thông tin tác giả
    authorInfo.style.display = 'block';
  }
}
  
  // Lấy danh sách các nút "Thêm vào giỏ hàng"
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productName, productPrice) {
  // Lấy giỏ hàng từ localStorage hoặc tạo mới nếu chưa có
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingProduct = cart.find(item => item.name === productName);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }

  // Lưu lại giỏ hàng vào localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
alert('Sản phẩm đã được thêm vào giỏ hàng!');
}

// Thêm sự kiện click cho các nút "Thêm vào giỏ hàng"
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-name');
    const productPrice = parseInt(button.getAttribute('data-price'));

    // Thêm sản phẩm vào giỏ hàng
    addToCart(productName, productPrice);
  });
});

// Xử lý nút "Mua Ngay"
const buyNowButtons = document.querySelectorAll('.buy-now-btn');
buyNowButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.parentElement.querySelector('p').textContent;
    const productPrice = parseInt(button.parentElement.querySelector('.price').textContent.replace('Giá: ', '').replace('đ', '').replace('.', ''));

    // Thêm sản phẩm vào giỏ hàng
    addToCart(productName, productPrice);

    // Chuyển hướng đến trang giỏ hàng
    window.location.href = './cart.html';
  });
});