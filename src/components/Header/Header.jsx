import { Link } from "react-router-dom";

import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.headerLogo}>CineScore</h1>
            <div className={styles.headerMenu}>
                <ul>
                    <li className={styles.headerMenuLink}><Link to={"/"}>Início</Link></li>
                    <li className={styles.headerMenuLink}><Link to={"/"}>Buscar Filmes</Link></li>
                    <li className={styles.headerMenuLink}><Link to={"/"}>Críticas</Link></li>
                    <li className={styles.headerMenuLink}><Link to={"/"}>Perfil</Link></li>
                    <li className={styles.headerMenuLink}><Link to={"/"}>Login</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Header