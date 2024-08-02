
import styles from "./DiscordImage.module.scss";
import { useState, useEffect } from "react";


export default function DiscordImage({pushedImage, setPushedImage}) {

    const [postid, setPostid] = useState(null);
    const [isTenor, setIsTenor] = useState(false);  
    useEffect(() => {
        if (!pushedImage) {
            return;
        }
        console.log("!!!pushed image: ");
        console.log(pushedImage);
        const script = document.createElement('script');
        
        if (pushedImage.url.includes("tenor")) {
            //get the last part of url after the last -
            setPostid(pushedImage.url.split("-").pop());
            setIsTenor(true);
            
            script.src = "https://tenor.com/embed.js";
            script.async = true;
            document.body.appendChild(script);
    
        } else {
            setIsTenor(false);
        }




        const timer = setTimeout(() => {
            console.log("clearing pushed image");
            setPushedImage(null);
        }, 17000);
        /* if (isTenor) {
            return () => {
                if (isTenor) {
                    document.body.removeChild(script);
                }
            }
        } */
    }, [pushedImage]);

    /* useEffect(() => {
        //load this script dynamically: https://tenor.com/embed.js
        const script = document.createElement('script');
        script.src = "https://tenor.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []); */


    return (
        <div className={styles.DiscordImage}>
            {pushedImage && 
                <aside className={`${styles.imageAside} ${isTenor ? styles.tenor : null}`}>
                    {!isTenor && <img src={pushedImage.url} className={styles.pushedImage} />}
                    {isTenor && <div class="tenor-gif-embed" data-postid={postid} data-share-method="host" data-aspect-ratio="0.833333" data-width="100%"><a href={pushedImage.url}>Loading Image From tenor</a></div> }
                </aside>
            }
        </div>
    )

}