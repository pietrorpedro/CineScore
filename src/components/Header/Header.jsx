import { Link } from "react-router-dom";

import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.headerLogo}>CineScore</h1>
            <div className={styles.headerMenu}>
                <ul>
                    <li className={styles.headerMenuLink}><Link to={"/"}>Início</Link></li>
                    <li className={styles.headerMenuLink}><Link to={"/search"}>Buscar Filmes</Link></li>
                    <li className={styles.headerMenuLink}><Link to={"/profile"}>Perfil</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Header