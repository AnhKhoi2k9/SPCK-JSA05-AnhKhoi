// Tìm kiếm tác giả qua Open Library API
async function searchAuthors(query) {
    const res = await fetch(`https://openlibrary.org/search/authors.json?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.docs;
}

// Lấy danh sách tác phẩm tiêu biểu của tác giả
async function fetchAuthorWorks(authorKey) {
    const res = await fetch(`https://openlibrary.org/authors/${authorKey}/works.json?limit=5`);
    const data = await res.json();
    return data.entries || [];
}

// Hiển thị kết quả tìm kiếm tác giả
async function displayAuthors(authors) {
    const results = document.getElementById('author-results');
    results.innerHTML = '';
    if (!authors.length) {
        results.innerHTML = '<p>Không tìm thấy tác giả nào.</p>';
        return;
    }
    for (const author of authors) {
        const works = await fetchAuthorWorks(author.key);
        results.innerHTML += `
            <div class="author-result">
                <div class="author-name">${author.name}</div>
                <div class="author-birth">${author.birth_date ? 'Năm sinh: ' + author.birth_date : ''}</div>
                <div class="author-works">
                    <b>Tác phẩm tiêu biểu:</b>
                    <ul>
                        ${works.map(work => `<li>${work.title}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
}

// Xử lý sự kiện tìm kiếm
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('author-search-bar');
    const searchBtn = document.getElementById('author-search-btn');
    async function handleSearch() {
        const query = searchBar.value.trim();
        if (query) {
            const authors = await searchAuthors(query);
            displayAuthors(authors);
        }
    }
    searchBtn.addEventListener('click', handleSearch);
    searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
});
