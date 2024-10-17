import styles from "./Profile.module.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import Button from "../../components/Button/Button.jsx";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import Review from "../../components/Review/Review.jsx";
import { fetchMovieTitle } from "../../services/apiCalls.js";

export default function Profile() {
    const { user, logout } = useAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userReviews, setUserReviews] = useState([]);
    const [movies, setMovies] = useState({});

    useEffect(() => {
        if (user) {
            setUserId(user.uid);
        }
    }, [user]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (userId) {
                const userDoc = doc(db, "users", userId);
                const docSnap = await getDoc(userDoc);

                if (docSnap.exists()) {
                    setUserInfo(docSnap.data());
                } else {
                    console.log("Erro ao encontrar o usuario");
                }
            }
        };

        fetchUserInfo();
    }, [userId]);

    useEffect(() => {
        async function fetchReviews() {
            if (userId) {
                const reviewQuery = query(collection(db, "reviews"), where("userId", "==", userId));
                const querySnapshot = await getDocs(reviewQuery);
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUserReviews(data);
            }
        }

        fetchReviews();
    }, [userId]);

    useEffect(() => {
        const fetchMovieTitles = async () => {
            const titles = {};
            for (const review of userReviews) {
                try {
                    const title = await fetchMovieTitle(review.movieId);
                    titles[review.movieId] = title;
                } catch (error) {
                    console.error(`Erro ao buscar título para o filme ID ${review.movieId}:`, error);
                }
            }
            setMovies(titles);
        };

        if (userReviews.length > 0) {
            fetchMovieTitles();
        }
    }, [userReviews]);

    async function handleLogout() {
        try {
            await logout();
        } catch (error) {
            console.log("Error logging out: ", error);
        }
    }

    return (
        <div className={styles.profile}>
            <h1>Página de Perfil</h1>
            {userInfo ? (
                <div>
                    <h2>Olá, {userInfo.username}</h2>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>Carregando informações do usuário...</p>
            )}
            <Button text="Sair" onClick={handleLogout} />

            <div className={styles.reviews}>
                <h2>Minhas Críticas</h2>
                {userReviews.length > 0 ? (
                    userReviews.map(review => (
                        <Review
                            key={review.id}
                            movie={movies[review.movieId]}
                            text={review.review}
                            author={review.username}
                            note={review.rating}
                            date={new Date(review.timestamp.seconds * 1000).toLocaleDateString()}
                        />
                    ))
                ) : (
                    <p>Você ainda não fez nenhuma crítica.</p>
                )}
            </div>
        </div>
    );
}
