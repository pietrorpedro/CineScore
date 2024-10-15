import { Link } from "react-router-dom";

import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <h1 className={styles.footerLogo}>CineScore</h1>
            <div className={styles.footerMenu}>
                <ul>
                    <li className={styles.footerMenuLink}><Link to={"/"}>Início</Link></li>
                    <li className={styles.footerMenuLink}><Link to={"/"}>Buscar Filmes</Link></li>
                    <li className={styles.footerMenuLink}><Link to={"/"}>Críticas</Link></li>
                    <li className={styles.footerMenuLink}><Link to={"/"}>Perfil</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;