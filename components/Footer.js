import styles from "./Footer.module.scss";


export default function Footer() {

    return (
        <footer className={styles.chenzo_footer}>
            <div id="latest_followers" className={`${styles.latest} windlass`}>
                <div>Latest Followers: <div id="latestFollowers" className={styles.followers}> - </div></div>
            </div>
            <div id="chatSpace" class="tchat windlass">
                <div id="phrase" class="aphrase"><span class="usr">Chenzo</span>: <span class="msg">HAhahaha this is just me saying stuff</span></div>
            </div>
        </footer>
    )

}