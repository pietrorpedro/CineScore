import styles from "./Review.module.css";

export default function Review({author, date, text, note}) {
    return (
        <div className={styles.review}>
            <div className={styles.author}>
                <h2>{author}</h2>
                <p>{date}</p>
            </div>
            <p>{text}</p>
            <p>{note}/5</p>
        </div>
    )
}