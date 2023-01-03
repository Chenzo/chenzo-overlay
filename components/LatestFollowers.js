import styles from "./LatestFollowers.module.scss";
import { useState, useEffect } from "react";

export default function LatestFollowers({twitchAccessToken}) {

    const [latestFollowers, setLatestFollowers] = useState("-"); 

    const getLatestFollowers = function() {

        console.log(twitchAccessToken)
        fetch('https://api.twitch.tv/helix/users/follows?to_id=' + process.env.NEXT_PUBLIC_USERID, {
          method: 'GET',
          headers: {
            'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID,
            'Authorization': "Bearer " + twitchAccessToken
          }
        })
        .then(response => response.json())
        .then(data =>
          displayFollowers(data),
          //console.log(data)
        )
        .catch(error => 
          console.log("Twitch Fetch Errored: " + error)
        ); 
    };

    const displayFollowers = function(followerData) {
        var followCount = (followerData.data.length < 4) ? followerData.data.length : 3;
        var followHTML = [];
        for (var index = 0; index < followCount; index++) { 
            if (index != followCount - 1) {
                followHTML.push(<span key={`flr-${index}`}>{followerData.data[index].from_name}, </span>);
            } else {
                followHTML.push(<span key={`flr-${index}`}>{followerData.data[index].from_name} </span>);
            }
        }
        setLatestFollowers(followHTML);
    };
  

    useEffect(() => {
        console.log("getLatest Followers");
        getLatestFollowers();
    }, []);

    return (
        <div id="latest_followers" className={`${styles.latest} windlass`}>
            <div>Latest Followers: <div id="latestFollowers" className={styles.followers}>{latestFollowers}</div></div>
        </div>
    )

}