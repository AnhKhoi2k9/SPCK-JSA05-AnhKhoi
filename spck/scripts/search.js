// Function to search books using Open Library API
async function searchBooks(query) {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        return data.docs;
    } catch (error) {
        console.error('Error searching books:', error);
        return [];
    }
}

// Function to display search results
function displaySearchResults(books) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = '';

    if (books.length === 0) {
        resultsContainer.innerHTML = '<p>Không tìm thấy kết quả nào.</p>';
        return;
    }

    const booksList = document.createElement('div');
    booksList.className = 'book-list';

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';

        // Get cover image if available
        const coverId = book.cover_i;
        const coverUrl = coverId 
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : 'https://via.placeholder.com/150x200?text=No+Cover';

        // Generate a random price between 100,000 and 300,000 VND
        const price = Math.floor(Math.random() * (300000 - 100000 + 1)) + 100000;

        bookItem.innerHTML = `
            <img src="${coverUrl}" alt="${book.title}">
            <p>${book.title}</p>
            <p class="author">${book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
            <p class="year">${book.first_publish_year || 'Unknown Year'}</p>
            <p class="price">Giá: ${price.toLocaleString('vi-VN')}đ</p>
            <button class="add-to-cart-btn" 
                data-name="${book.title}" 
                data-price="${price}"
                data-cover-id="${coverId || ''}">
                Thêm vào giỏ hàng
            </button>
        `;

        booksList.appendChild(bookItem);
    });

    resultsContainer.appendChild(booksList);
}

// Function to add book to cart
function addToCart(name, price, coverId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1,
            coverId: coverId
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const searchBtn = document.getElementById('search-btn');

    // Get search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    // If there's a query in the URL, perform the search
    if (query) {
        searchBar.value = query;
        handleSearch();
    }

    async function handleSearch() {
        const query = searchBar.value.trim();
        if (query) {
            const books = await searchBooks(query);
            displaySearchResults(books);
        }
    }

    // Search when button is clicked
    searchBtn.addEventListener('click', handleSearch);

    // Search when Enter key is pressed
    searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
});

// Add event listener for add-to-cart buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const name = e.target.dataset.name;
        const price = parseInt(e.target.dataset.price);
        const coverId = e.target.dataset.coverId || null;
        addToCart(name, price, coverId);
    }
}); 