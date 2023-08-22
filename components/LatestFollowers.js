import styles from "./LatestFollowers.module.scss";
import { useEffect } from "react";
import { useOverlayContext } from "lib/overlay.context";

export default function LatestFollowers() {

    const { latestFollowers } = useOverlayContext();

    useEffect(() => {
        console.log("latestFollowers useEffect");
    }, [latestFollowers]); 

    return (
        <div id="latest_followers" className={`${styles.latest} windlass`}>
            <div>Latest Followers: 
                <div id="latestFollowers" className={styles.followers}>
                        {latestFollowers?.data?.map((follower, index) => {
                            if (index < 3)
                            return (
                                <span key={`flr-${index}`}>{follower.from_name}{(index < 2) &&<span className={styles.comma}>,</span>} </span>
                            ) 
                        })}
                </div>
            </div>
        </div>
    )

}