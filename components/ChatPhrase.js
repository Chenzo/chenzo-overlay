import styles from "./ChatPhrase.module.scss";
import { useRef, useEffect } from "react";
import { renderToString } from 'react-dom/server'

export default function ChatPhrase({usr, msg, emotes}) {

    const phrase = useRef();

    //let message = [msg];
    let messageArray = [msg];

    /*
    emotes: {
        "30259": [ //image id
            "7-13" //start and end in msg string
        ]
    }
    */

    if (emotes) {
        //const stringReplacements = [];
        
        let stringsToReplace = {};
        Object.entries(emotes).forEach(([id, positions]) => {
            console.log(`emote id = ${id} at ${positions} - https://static-cdn.jtvnw.net/emoticons/v1/${id}/2.0`);
            const position = positions[0];
            const [start, end] = position.split("-");
            const stringToReplace = msg.substring(
                parseInt(start, 10),
                parseInt(end, 10) + 1
            );

            //Left this in, causes [object OBJECT] in the string
          
            //let imgHTML = `<img src="https://static-cdn.jtvnw.net/emoticons/v1/${id}/2.0" />`
            /* stringReplacements.push({
                stringToReplace: stringToReplace,
                replacement: <img src={`https://static-cdn.jtvnw.net/emoticons/v1/${id}/2.0`} />,
                //replacement: imgHTML,
            }); */


            stringsToReplace[stringToReplace] = <img src={`https://static-cdn.jtvnw.net/emoticons/v1/${id}/2.0`} />
        });     


        /* message = stringReplacements.reduce(
            (acc, { stringToReplace, replacement }) => {
                // obs browser doesn't seam to know about replaceAll
                console.log(replacement)
                return acc.split(stringToReplace).join(replacement);
            },
            msg
        ); */


        messageArray = msg.split(' ').map(word => {
            if (stringsToReplace[word]) {
                return stringsToReplace[word]
            }
            return " " + word + " "
        })

    }

    return (
        <div ref={phrase} className={`${styles.aphrase}`}>
            <span className={styles.usr}>{usr}</span>
            <span className={styles.colon}>:</span> 
            {/* <span className={styles.msg}>{message}</span> */}
            <span className={styles.msg}>{messageArray}</span>
        </div> 
    )

}