import styles from "./Footer.module.scss";

import LatestFollowers from "./LatestFollowers";

export default function Footer({twitchAccessToken}) {

    return (
        <footer className={styles.chenzo_footer}>
            <LatestFollowers twitchAccessToken={twitchAccessToken}/>
            <div id="chatSpace" class="tchat windlass">
                <div id="phrase" class="aphrase"><span class="usr">Chenzo</span>: <span class="msg">HAhahaha this is just me saying stuff</span></div>
            </div>
        </footer>
    )

}