import styles from "./Footer.module.scss";

import LatestFollowers from "./LatestFollowers";
import ChatScroller from "./ChatScroller";

export default function Footer({twitchAccessToken}) {

    return (
        <footer className={styles.chenzo_footer}>
            <LatestFollowers twitchAccessToken={twitchAccessToken}/>
            <ChatScroller />
        </footer>
    )

}