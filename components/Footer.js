import styles from "./Footer.module.scss";
import { useState, useEffect } from "react";

import LatestFollowers from "./LatestFollowers";
import ChatScroller from "./ChatScroller";
import { useOverlayContext } from 'lib/overlay.context'

export default function Footer() {

    const { lastChat } = useOverlayContext();

    const [isHidden, setIsHidden] = useState(false);
    const [tmr, setTMR] = useState(0);


    useEffect(() => {
        console.log("hide followers for a moment");
        clearTimeout(tmr);
        setIsHidden(true);
        let timer = setTimeout(function() {
            setIsHidden(false)
        }, 5000);
        setTMR(timer);
    }, [lastChat]);

    return (
        <footer className={styles.chenzo_footer}>
            <div className={`${styles.followers} ${(isHidden) ? styles.hidden : ""}`}>
                <LatestFollowers/>
            </div>
            <ChatScroller lastChat={lastChat}/>
        </footer>
    )

}