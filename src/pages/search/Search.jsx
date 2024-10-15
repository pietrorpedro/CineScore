import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { fetchMovieGenres, fetchMoviesByGenre, fetchMoviesByTitle } from "../../services/apiCalls";
import styles from "./Search.module.css";

export default function Search() {
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const genresData = await fetchMovieGenres();
                setGenres(genresData);
            } catch (err) {
                console.log("Error: ", err);
            }
        }
        load();
    }, []);

    async function handleSearch(e) {
        e.preventDefault();
        try {
            const search = await fetchMoviesByTitle(searchInput);
            setMovies(search);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleSearchByGenre(genreId) {
        try {
            const search = await fetchMoviesByGenre(genreId);
            setMovies(search);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.search}>
            <h1>Buscar Filmes</h1>
            <form className={styles.form} onSubmit={handleSearch}>
                <div className={styles.formInput}>
                    <label>Nome do Filme</label>
                    <input
                        type="text"
                        placeholder="Nome do filme"
                        onChange={(e) => setSearchInput(e.target.value)}
                        value={searchInput}
                    />
                </div>
                <Button text={"Procurar"} type={"submit"} />
            </form>

            {genres && (
                <div>
                    <h2>Gêneros</h2>
                    <div className={styles.genres}>
                        {genres.map((genre, index) => (
                            <Button
                                key={index}
                                text={`${genre.name}`}
                                onClick={() => handleSearchByGenre(genre.id)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {movies && (
                <div className={styles.movies}>
                    {movies.map((movie) => (
                        <div key={movie.id} className={styles.movie}>
                            <Link to={`/details/${movie.id}`}>
                                {movie.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className={styles.poster}
                                    />
                                )}
                                <h2>{movie.title}</h2>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
