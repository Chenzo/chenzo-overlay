import styles from "./HeadShot.module.scss";
import CircleAudioBars from "./CircleAudioBars";
import Skully from "./Skully";
import Terrance from "./Terrance";
import VuMeter from "./VuMeter";

export default function HeadShot({headType}) {

    return (
        <div id="headshot" className={`${styles.avContainer} ${styles.HeadShot}`}>
            {(headType != "vumeter") &&
                <div className={`goldBG ${styles.streamName}`}>
                    <div className="windlass">Mr<span>.</span> Chenzo</div>
                </div>
            }
            {(headType == "chenzo") &&
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

            {(headType == "skully") &&
                <Skully/>
            }

            {(headType == "canada") &&
                <Terrance/>
            }

            {(headType == "vumeter") &&
                <VuMeter/>
            }
            
        </div>
    )

}