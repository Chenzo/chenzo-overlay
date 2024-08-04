
import styles from "./DiscordImage.module.scss";
import { useState, useEffect } from "react";


export default function DiscordImage({pushedImage, setPushedImage, setCurrentAudio}) {

    const [postid, setPostid] = useState(null);
    const [isTenor, setIsTenor] = useState(false);  

    const [caption, setCaption] = useState("Chenzo pushed this image posted by Binobo in #channel!!");

    useEffect(() => {
        if (!pushedImage) {
            return;
        }
        /* console.log("!!!pushed image: ");
        console.log(pushedImage); */
        const script = document.createElement('script');
        
        if (pushedImage?.url?.includes("tenor")) {
            //get the last part of url after the last -
            setPostid(pushedImage.url.split("-").pop());
            setIsTenor(true);
            
            script.src = "https://tenor.com/embed.js";
            script.async = true;
            document.body.appendChild(script);
    
        } else {
            setIsTenor(false);
        }


        const captionMarkUp = <><span>{pushedImage.pusher}</span> pushed this image posted by <span>{pushedImage.author}</span> in <span>{pushedImage.channel}</span></>
        setCaption(captionMarkUp);

        console.log("setting audio to shutter");
        setCurrentAudio("shutter");
        const timer = setTimeout(() => {
            console.log("clearing pushed image");
            setPushedImage(null);
        }, 13000);
        /* if (isTenor) {
            return () => {
                if (isTenor) {
                    document.body.removeChild(script);
                }
            }
        } */
    }, [pushedImage]);

    /* useEffect(() => {
        const fakeData = {
            "event": "imagePush",
            "url": "https://cdn.discordapp.com/attachments/176173885559930880/1269026918393712751/sad_pirate.gif?ex=66b08b2a&is=66af39aa&hm=59f4e9d85af147014228eabc2021895f580fd73754fb634cad595e12ad369beb&",
            "author": "chenzo",
            "channel": "robots",
            "dateTime": "2024-08-02T20:19:54.778Z",
            "pusher": "chenzo"
        };
        setPushedImage(fakeData);
    }, []); */

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
                    {/* <img src="https://cdn.dribbble.com/users/185738/screenshots/2751203/cowboy.gif" className={styles.theImage} /> */}
                    {!isTenor && <img src={pushedImage.url} className={styles.pushedImage} />}
                    {isTenor && <div className="tenor-gif-embed" data-postid={postid} data-share-method="host" data-width="120%"><a href={pushedImage.url}>Loading Image From tenor</a></div> } 
                    <div className={styles.titleCard}>
                        <p className={`${styles.caption} windlass`}>{caption}</p>
                        <img src="/images/tbanner.png" className={styles.imageBanner}/>
                    </div>
                </aside>
            }
        </div>
    )

}