import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Review from "../../components/Review/Review";
import { useAuth } from "../../context/AuthContext.jsx";
import { db } from "../../firebase.js";
import { fetchMovieDetails } from "../../services/apiCalls";
import styles from "./Details.module.css";

export default function Details() {
    const { user } = useAuth();
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [input, setInput] = useState("");
    const [rating, setRating] = useState(0);
    
    useEffect(() => {
        const load = async () => {
            try {
                const movieDetails = await fetchMovieDetails(id);
                setMovieDetails(movieDetails);
                await loadReviews();
            } catch (err) {
                console.log("Error: ", err);
            }
        };

        if (id) {
            load();
        }
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (input && rating !== 0 && rating <= 5) {
            try {
                await addDoc(collection(db, "reviews"), {
                    movieId: id,
                    userId: user.uid,
                    username: user.username,
                    review: input,
                    rating: rating,
                    createdAt: serverTimestamp()
                });

                setInput("");
                setRating(0);
                await loadReviews();
                alert("enviada")
            } catch (error) {
                console.log("Erro ao enviar a crítica: ", error);
            }
        }
    }

    async function loadReviews() {
        const reviewsQuery = query(collection(db, "reviews"), where("movieId", "==", id));
        const querySnapshot = await getDocs(reviewsQuery);
        const reviewsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReviews(reviewsData);
    }

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

                            <form className={styles.reviewSubmit} onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Escrever crítica"
                                    onChange={(e) => setInput(e.target.value)}
                                    value={input}
                                />
                                <input
                                    type="number"
                                    placeholder="Nota (0-10)"
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    value={rating}
                                    max="10"
                                    min="0"
                                />
                                <Button type={"submit"} text={"Publicar"} />
                            </form>

                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <Review
                                        key={review.id}
                                        text={review.review}
                                        author={review.username}
                                        note={review.rating}
                                        date={review.createdAt?.seconds ? new Date(review.createdAt.seconds * 1000).toLocaleDateString("pt-BR") : "Data inválida"}
                                    />

                                ))
                            ) : (
                                <h2 className={styles.center}>Ninguém postou nenhuma crítica ainda, seja o
                                    primeiro!</h2>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}
