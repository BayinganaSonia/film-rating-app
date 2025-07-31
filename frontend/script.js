document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const resultsContainer = document.getElementById('resultsContainer');

  let movies = [];

  searchInput.addEventListener('keyup', (e) => {
    const query = e.target.value.trim();
    if (query.length >= 3) {
      fetchMovies(query);
    } else {
      resultsContainer.innerHTML = '';
    }
  });

  sortSelect.addEventListener('change', () => {
    if (movies.length) {
      renderMovies(sortMovies([...movies], sortSelect.value));
    }
  });

  async function fetchMovies(query) {
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data.Response === 'False') {
        resultsContainer.innerHTML = `<p class="error">${data.Error}</p>`;
        return;
      }

      // Fetch full details for each movie
      const details = await Promise.all(
        data.Search.slice(0, 5).map(item =>
          fetch(`/api/details?id=${item.imdbID}`).then(res => res.json())
        )
      );

      movies = details;
      renderMovies(movies);
    } catch (err) {
      resultsContainer.innerHTML = `<p class="error">Failed to fetch data.</p>`;
      console.error(err);
    }
  }

  function sortMovies(data, criteria) {
    if (criteria === 'rating') {
      return data.sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));
    }
    if (criteria === 'year') {
      return data.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    }
    return data;
  }

  function renderMovies(data) {
    resultsContainer.innerHTML = data
      .map(movie => `
        <div class="movie-card">
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}" />
          <div class="info">
            <h2>${movie.Title}</h2>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
            <p>${movie.Plot}</p>
          </div>
        </div>
      `)
      .join('');
  }
});
