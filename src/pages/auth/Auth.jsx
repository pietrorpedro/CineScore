import styles from "./Auth.module.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import { db } from "../../firebase.js"; // Importa Firestore
import { doc, setDoc } from "firebase/firestore";

export default function Auth() {
    const { login, register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isRegister) {
                const userCredential = await register(email, password);
                const user = userCredential.user;

                // Salva dados do usuário no Firestore
                await setDoc(doc(db, "users", user.uid), {
                    username: username,
                    email: email
                });
            } else {
                const userCredential = await login(email, password);
            }
            navigate("/profile");
        } catch (error) {
            console.log("error: ", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.auth}>
            <h1>{isRegister ? "Criar Conta" : "Entrar"}</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                {isRegister && (
                    <label>
                        Nome de usuário
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Nome de usuário"
                            required
                        />
                    </label>
                )}
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                />
                </label>
                <label>
                    Senha
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                        required
                    />
                </label>
                <Button
                    type="submit"
                    text={loading ? "Carregando..." : (isRegister ? "Criar conta" : "Entrar")}
                    disabled={loading}
                />
            </form>
            <div className={styles.changeForm}>
                <Button
                    onClick={() => setIsRegister(!isRegister)}
                    text={isRegister ? "Já tem uma conta? Entre agora!" : "Não tem uma conta? Crie uma!"}
                />
            </div>
        </div>
    );
}
