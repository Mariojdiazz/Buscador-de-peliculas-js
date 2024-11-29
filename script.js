document.getElementById('searchButton').addEventListener('click', searchMovies);

let api_key = 'ab8ac965e5c2c4e73d0356a5e88b6c6c';
let urlBase = 'https://api.themoviedb.org/3/search/movie';
let urlImg = 'https://image.tmdb.org/t/p/w200';


let modal = document.getElementById("movieModal");
let modalTitle = document.getElementById("modalTitle");
let modalReleaseDate = document.getElementById("modalReleaseDate");
let modalOverview = document.getElementById("modalOverview");
let modalPoster = document.getElementById("modalPoster");
let closeModal = document.getElementById("closeModal");

function searchMovies() {
    let searchInput = document.getElementById('searchInput').value;
    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
        .then(response => response.json())
        .then(response => displayMovies(response.results));
}

function displayMovies(movies) {
    let resultadoContainer = document.getElementById('results');
    resultadoContainer.innerHTML = ''; 

    if (movies.length === 0) {
        resultadoContainer.innerHTML = '<p>No se han encontrado resultados para la búsqueda.</p>';
        return;
    }

    movies.forEach(movie => {
        let movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        let title = document.createElement('h2');
        title.textContent = movie.title;

        let releaseDate = document.createElement('p');
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date;

        let overview = document.createElement('p');
        overview.textContent = movie.overview;

        let posterPath = urlImg + movie.poster_path;
        let poster = document.createElement('img');
        poster.src = posterPath;

   
        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(overview);


        movieDiv.addEventListener('click', () => openModal(movie));


        resultadoContainer.appendChild(movieDiv);
    });
}


function openModal(movie) {
    modal.style.display = "block";
    modalTitle.textContent = movie.title;
    modalReleaseDate.textContent = 'Fecha de lanzamiento: ' + movie.release_date;
    modalOverview.textContent = movie.overview;
    modalPoster.src = urlImg + movie.poster_path;
}


closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});


window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
