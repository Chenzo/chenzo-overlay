
import styles from "./DiscordImage.module.scss";
import { useState, useEffect } from "react";


export default function DiscordImage({pushedImage, setPushedImage}) {


    useEffect(() => {
        if (!pushedImage) {
            return;
        }
        console.log("pushed image: ");
        console.log(pushedImage);
        const timer = setTimeout(() => {
            console.log("clearing pushed image");
            setPushedImage(null);
        }, 17000);
    }, [pushedImage]);


    return (
        <div className={styles.DiscordImage}>
            {pushedImage && 
                <aside>
                <img src={pushedImage.url} className={styles.pushedImage} />
                </aside>
            }
        </div>
    )

}