import styles from "./Card.module.css";

const Card = ({title, text, imagePath}) => {
    return (
        <div className={styles.card}>
            <img className={styles.cardImage} src={imagePath} alt={title} />
            <div className={styles.cardContent}>
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Card;