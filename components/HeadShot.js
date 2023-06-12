import styles from "./HeadShot.module.scss";
import CircleAudioBars from "./CircleAudioBars";
import Skully from "./Skully";
import Terrance from "./Terrance";
import VuMeter from "./VuMeter";

import { useState, useEffect, useRef } from "react";



export default function HeadShot({headType}) {

    const [currentHeadshot, setCurrentHeadshot] = useState(headType);
    const headShotContainer = useRef(null);

    useEffect(() => {
        console.log("headhshot changed");
        //setCurrentHeadshot(headType);
        headShotContainer.current.classList.add(styles.switching);
        setTimeout(() => {
            headShotContainer.current.classList.remove(styles.switching);
            setCurrentHeadshot(headType);
        }, 500);
    }, [headType]);
    

    return (
        <div ref={headShotContainer} id="headshot" className={`${styles.avContainer} ${styles.HeadShot}`}>
            {(currentHeadshot != "vumeter") &&
                <div className={`goldBG ${styles.streamName}`}>
                    <div className="windlass">Mr<span>.</span> Chenzo</div>
                </div>
            }
            {(currentHeadshot == "chenzo") &&
                <>
                <CircleAudioBars/>
                <div className={`${styles.imageContainer} ${styles.circleContainer}`}>
                    
                    <video width="250" autoPlay={true} muted={true} loop={true}>
                        <source src="https://chenzorama.com/overlay/video/chenzo_headshot.webm"
                            type="video/webm" />
                    </video>
                
                </div>
                </>
             }

            {(currentHeadshot == "skully") &&
                <Skully/>
            }

            {(currentHeadshot == "canada") &&
                <Terrance/>
            }

            {(currentHeadshot == "vumeter") &&
                <VuMeter/>
            }
            
        </div>
    )

}