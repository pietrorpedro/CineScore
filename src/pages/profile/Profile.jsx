import styles from "./Profile.module.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import Button from "../../components/Button/Button.jsx";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
    const { user, logout } = useAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (user) {
            setUserId(user.uid); // Armazenar o ID do usuário
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
                    console.log("No such document!");
                }
            }
        };

        fetchUserInfo();
    }, [userId]); // Executar apenas quando o ID do usuário mudar

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
        </div>
    );
}
