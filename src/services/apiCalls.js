import axios from "axios";

export async function fetchMovieGenres() {
    const url = 'https://api.themoviedb.org/3/genre/movie/list';
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmYwN2Q5MGIwZGU2ZDNmNWFkOGQ3YzM2MjEzYjAwZSIsIm5iZiI6MTcyNzM3MjUwOC4xMDE3MzIsInN1YiI6IjY2YTgyNjFjNDg3ODVkNDYzNGUwYTE3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BUSgsCrwX8hxesRRLlgdcshpF-_rF1JYCiBsahEzqzw`
        }
    };

    try {
        const response = await axios.get(url, options);
        return response.data.genres;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
}

export async function fetchPopularMovies() {
    const url = 'https://api.themoviedb.org/3/movie/popular';
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmYwN2Q5MGIwZGU2ZDNmNWFkOGQ3YzM2MjEzYjAwZSIsIm5iZiI6MTcyNzM3MjUwOC4xMDE3MzIsInN1YiI6IjY2YTgyNjFjNDg3ODVkNDYzNGUwYTE3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BUSgsCrwX8hxesRRLlgdcshpF-_rF1JYCiBsahEzqzw'
        }
    };

    try {
        const response = await axios.get(url, options);
        return response.data.results;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
}

export async function fetchMoviesByGenre(genreId) {
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`;
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmYwN2Q5MGIwZGU2ZDNmNWFkOGQ3YzM2MjEzYjAwZSIsIm5iZiI6MTcyNzM3MjUwOC4xMDE3MzIsInN1YiI6IjY2YTgyNjFjNDg3ODVkNDYzNGUwYTE3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BUSgsCrwX8hxesRRLlgdcshpF-_rF1JYCiBsahEzqzw'
        }
    };

    try {
        const response = await axios.get(url, options);
        return response.data.results;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
}

export async function fetchMoviesByTitle(title) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${title}`;
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmYwN2Q5MGIwZGU2ZDNmNWFkOGQ3YzM2MjEzYjAwZSIsIm5iZiI6MTcyNzM3MjUwOC4xMDE3MzIsInN1YiI6IjY2YTgyNjFjNDg3ODVkNDYzNGUwYTE3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BUSgsCrwX8hxesRRLlgdcshpF-_rF1JYCiBsahEzqzw'
        }
    };

    try {
        const response = await axios.get(url, options);
        const movies = response.data.results;

        // cria um objeto com os dados do filme buscado e coloca a url da img
        const moviesWithImages = await Promise.all(movies.map(async (movie) => {
            const imagesResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/images`, options);
            return {
                ...movie,
                images: imagesResponse.data.backdrops,
            };
        }));

        return moviesWithImages;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
}