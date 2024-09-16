import Card from "../../components/Card/Card";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";

import styles from "./Home.module.css";

export default function Home() {
    return (
        <div className={styles.home}>
            <div className={styles.horizontalCard}>
                <HorizontalCard
                    title={"Descubra, Avalie e Compartilhe"}
                    text={"Nossa aplicação oferece uma experiência única para os amantes de cinema, permitindo explorar e avaliar uma vasta seleção de filmes. Com funcionalidades projetadas para enriquecer sua jornada cinematográfica, você pode buscar filmes de seu interesse com nossa ferramenta eficiente, acessar informações detalhadas sobre cada filme, como sinopse, elenco e data de lançamento, e registrar suas críticas e notas."}
                    imagePath={"./assets/card1.jpg"}
                />
            </div>

            <div className={styles.movieList}>
                <h2>Melhores Filmes</h2>
                <div className={styles.list}>
                    <div className={styles.card}>
                        <Card
                            title={"Título Filme"}
                            text={"Ação"}
                            imagePath={"./assets/placeholder.jpg"}
                        />
                    </div>
                    <div className={styles.card}>
                        <Card
                            title={"Título Filme"}
                            text={"Ação"}
                            imagePath={"./assets/placeholder.jpg"}
                        />
                    </div>
                    <div className={styles.card}>
                        <Card
                            title={"Título Filme"}
                            text={"Ação"}
                            imagePath={"./assets/placeholder.jpg"}
                        />
                    </div>
                    <div className={styles.card}>
                        <Card
                            title={"Título Filme"}
                            text={"Ação"}
                            imagePath={"./assets/placeholder.jpg"}
                        />
                    </div>
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
    )
}