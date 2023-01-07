import styles from "./ChatScroller.module.scss";

export default function ChatScroller() {

    return (
        <div className={`${styles.chatSpace}`}>
             <div id="phrase" className={styles.aphrase}>
                <span className={styles.usr}>Chenzo</span>
                <span className={styles.colon}>:</span> 
                <span className={styles.msg}>HAhahaha this is just me saying stuff</span>
            </div> 
        </div>
    )

}