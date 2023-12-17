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
                {latestFollowers &&
                    <div id="latestFollowers" className={styles.followers}>
                            {latestFollowers?.data?.map((follower, index) => {
                                if (index < 3)
                                return (
                                    <span key={`flr-${index}`}>{follower.user_name}{(index < 2) &&<span className={styles.comma}>,</span>} </span>
                                ) 
                            })}
                    </div>
                }
                {!latestFollowers &&
                    <div id="latestFollowers" className={styles.followers}>Not Logged In</div>
                }
            </div>
        </div>
    )

}