import styles from "./HeadShot.module.scss";
import CircleAudioBars from "./CircleAudioBars";

export default function HeadShot() {

    return (
        <div id="headshot" className={`${styles.avContainer} ${styles.HeadShot}`}>
            <div className={`goldBG ${styles.streamName}`}>
                <div className="windlass">Mr<span>.</span> Chenzo</div>
            </div>
            <CircleAudioBars/>
            <div className={`${styles.imageContainer} ${styles.circleContainer}`}>
                <video width="250" autoPlay={true} muted={true} loop={true}>
                    <source src="https://chenzorama.com/overlay/video/chenzo_headshot.webm"
                        type="video/webm" />
                </video>
            </div>
            
        </div>
    )

}