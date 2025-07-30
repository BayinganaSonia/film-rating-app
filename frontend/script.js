document.addEventListener('DOMContentLoaded', async () => {
  const filmList = document.getElementById('film-list');
  const searchInput = document.getElementById('search');
  let films = [];

  async function fetchFilms() {
    try {
      const res = await fetch('/api/popular');
      const data = await res.json();
      films = data || [];
      renderFilms(films);
    } catch (err) {
      filmList.innerHTML = '<p>Failed to load films.</p>';
    }
  }

  function renderFilms(list) {
    filmList.innerHTML = list.map(film => `
      <div class="film-card">
        <h3>${film.title}</h3>
        <p><strong>Rating:</strong> ${film.rating}</p>
        <p>${film.description || 'No description available.'}</p>
      </div>
    `).join('');
  }

  searchInput.addEventListener('input', (e) => {
    const filtered = films.filter(f => f.title.toLowerCase().includes(e.target.value.toLowerCase()));
    renderFilms(filtered);
  });

  fetchFilms();
});

