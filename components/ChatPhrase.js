import styles from "./ChatPhrase.module.scss";
import { useRef, useEffect } from "react";
import { renderToString } from 'react-dom/server'

export default function ChatPhrase({usr, msg, emotes}) {

    const phrase = useRef();

    let message = [msg];

    if (emotes) {
        console.log("has emotes");
        const stringReplacements = [];
        

        Object.entries(emotes).forEach(([id, positions]) => {
            console.log(`emote id = ${id} at ${positions}`);
            const position = positions[0];
            const [start, end] = position.split("-");
            /* let front = message.substring(0, parseInt(start, 10));
            let back = message.substring(parseInt(end, 10) + 1); */

            const stringToReplace = msg.substring(
                parseInt(start, 10),
                parseInt(end, 10) + 1
            );
          
            stringReplacements.push({
                stringToReplace: stringToReplace,
                replacement: <img src={`https://static-cdn.jtvnw.net/emoticons/v1/${id}/2.0`} />,
            });
            /* let src = `https://static-cdn.jtvnw.net/emoticons/v1/${id}/2.0`;
            message = <span>{front}<img src={src} />{back}</span> */
        });     

        message = [];
        let choppedMessage = msg
        for (let e=0; e<stringReplacements.length; e++) {
            let pts = choppedMessage.split(stringReplacements[e].stringToReplace);
            message.push(pts[0]);
            message.push(stringReplacements[e].replacement);
            choppedMessage = pts[1];
        }


        //message = msg.replaceAll(stringReplacements[0].stringToReplace, <span>stringReplacements[0].replacement</span>)
        
        /* message = stringReplacements.reduce(
            (acc, { stringToReplace, replacement }) => {
                // obs browser doesn't seam to know about replaceAll
                console.log(replacement)
                return acc.split(stringToReplace).join(replacement);
            },
            msg
        ); */

        //message = <img src="https://static-cdn.jtvnw.net/emoticons/v1/${id}/2.0" />;
        //https://static-cdn.jtvnw.net/emoticons/v1/64138/1.0 */
    }

    return (
        <div ref={phrase} className={`${styles.aphrase}`}>
            <span className={styles.usr}>{usr}</span>
            <span className={styles.colon}>:</span> 
            <span className={styles.msg}>{message}</span>
        </div> 
    )

}