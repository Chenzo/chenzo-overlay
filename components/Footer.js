import styles from "./Footer.module.scss";
import { useRef, useEffect } from "react";

import LatestFollowers from "./LatestFollowers";
import ChatScroller from "./ChatScroller";

export default function Footer({twitchAccessToken, lastChat}) {

    useEffect(() => {
        console.log("hide followers for a moment");
        
    }, [lastChat]);

    return (
        <footer className={styles.chenzo_footer}>
            <LatestFollowers twitchAccessToken={twitchAccessToken}/>
            <ChatScroller lastChat={lastChat}/>
        </footer>
    )

}