import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";
import { fetchPopularMovies } from "../../services/apiCalls.js";
import styles from "./Home.module.css";

export default function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await fetchPopularMovies();
                setMovies(data);
            } catch (err) {
                console.log("Error: ", err);
            }
        };

        loadMovies();
    }, []);

    return (
        <div className={styles.home}>
            <div className={styles.horizontalCard}>
                <HorizontalCard
                    title={"Descubra, Avalie e Compartilhe"}
                    text={"Nossa aplicação oferece uma experiência única para os amantes de cinema, permitindo explorar e avaliar uma vasta seleção de filmes. Com funcionalidades projetadas para enriquecer sua jornada cinematográfica, você pode buscar filmes de seu interesse com nossa ferramenta eficiente, acessar informações detalhadas sobre cada filme, como sinopse, elenco e data de lançamento, e registrar suas críticas e notas."}
                    imagePath={"/assets/card1.jpg"}
                />
            </div>

            <div className={styles.movieList}>
                <h2>Melhores Filmes</h2>
                <div className={styles.movies}>
                    {movies.slice(0, 4).map((movie) => (
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
            </div>

            <div className={styles.horizontalCard}>
                <HorizontalCard
                    title={"Contribua para a Comunidade"}
                    text={"Sua participação é fundamental para enriquecer nossa plataforma. Ao registrar suas críticas e notas, você não apenas expressa suas próprias opiniões, mas também contribui para uma comunidade ativa e informada de cinéfilos."}
                    imagePath={"./assets/card2.jpg"}
                />
            </div>
        </div>
    );
}
