import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Review from "../../components/Review/Review";
import { fetchMovieDetails } from "../../services/apiCalls";
import styles from "./Details.module.css";

export default function Details() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const movieDetails = await fetchMovieDetails(id);
                setMovieDetails(movieDetails);
                console.log(movieDetails)
            } catch (err) {
                console.log("Error: ", err);
            }
        };
        if (id) {
            load();
        }
    }, [id]);

    return (
        <div>
            {movieDetails ? (
                <div className={styles.details}>
                    <div className={styles.poster}>
                        {movieDetails.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                                alt={movieDetails.title}
                                className={styles.poster}
                            />
                        )}
                    </div>
                    <div className={styles.info}>
                        <h1 className={styles.center}>{movieDetails.title}</h1>
                        <p>{movieDetails.overview}</p>
                        <div>
                            <h1 className={styles.center}>Gêneros</h1>
                            <div className={styles.genres}>
                                {movieDetails.genres.map(genre => (
                                    <Button
                                        key={genre.id}
                                        text={genre.name}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className={styles.reviews}>
                            <h1 className={styles.center}>Críticas</h1>
                            <form className={styles.reviewSubmit}>
                                <input type="text" placeholder="Escrever crítica"/>
                                <Button
                                    text={"Publicar"}
                                />
                            </form>
                            <Review
                                author={"Pietro"}
                                date={"15/10/2024"}
                                text={"Gostei muito"}
                                note={5}
                            />
                            <Review
                                author={"Pietro"}
                                date={"15/10/2024"}
                                text={"Gostei muito"}
                                note={5}
                            />
                            <Review
                                author={"Pietro"}
                                date={"15/10/2024"}
                                text={"Gostei muito"}
                                note={5}
                            />
                            <Review
                                author={"Pietro"}
                                date={"15/10/2024"}
                                text={"Gostei muito"}
                                note={5}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}
