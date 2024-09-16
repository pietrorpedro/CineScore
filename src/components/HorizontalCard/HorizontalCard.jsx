import styles from "./HorizontalCard.module.css";

const HorizontalCard = ({imagePath, title, text}) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
            <div className={styles.cardImage}>
                <img src={imagePath} alt={title} />
            </div>
        </div>
    )
}

export default HorizontalCard;