

async function fetchMovies(query) {
    const API_KEY = "ec648922";  // 🔴 Replace with your actual key
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;
    console.log("Fetching:", url); 

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("API Response:", data);  // Debugging

        if (data.Response === "True") {
            displayMovies(data.Search); // ✅ Call display function here
        } else {
            console.error("No movies found:", data.Error);
            document.getElementById("movies-container").innerHTML = `<h3>${data.Error}</h3>`;
        }
    } catch (error) {
        console.error("API Error:", error);
        document.getElementById("movies-container").innerHTML = "<h3>Failed to fetch movies.</h3>";
    }
}



// Function to display movies
function displayMovies(movies) {
    moviesContainer.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}" alt="${movie.Title}">
            <h3>${movie.Title} (${movie.Year})</h3>
        </div>
    `).join("");
}

// Search Button Event
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMovies(query);
    }
});

// "Surprise Me" Button Event (fetches a random movie)
randomBtn.addEventListener("click", async () => {
    const popularMovies = ["Inception", "Titanic", "The Matrix", "Avengers", "Interstellar"];
    const randomMovie = popularMovies[Math.floor(Math.random() * popularMovies.length)];
    fetchMovies(randomMovie);
});

document.addEventListener("DOMContentLoaded", () => {
    fetchMovies("Barbie");  // Replace with any default movies
});

function toggleLoader(show) {
    document.getElementById("loader").style.display = show ? "block" : "none";
}


