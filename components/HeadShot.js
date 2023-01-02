import styles from "./HeadShot.module.scss";


export default function HeadShot() {

    return (
        <div id="headshot" className={`${styles.avContainer} ${styles.HeadShot}`}>
            <div className={`goldBG ${styles.streamName}`}>
                <div class="windlass">Mr<span>.</span> Chenzo</div>
            </div>
            <div class="audioContainer">
                <canvas width="500" height="500" id="circle-canvas"></canvas>
            </div>
            <div class="audioContainer flipped">
                <canvas width="500" height="500" id="circle-canvas-2"></canvas>
            </div>
            <div className={`${styles.imageContainer} ${styles.circleContainer}`}>
                <video width="250" autoPlay={true} muted={true} loop={true}>
                    <source src="https://chenzorama.com/overlay/video/chenzo_headshot.webm"
                        type="video/webm" />
                </video>

                <div id="skull_bg" class="skull_bg"></div>
                <div id="skull_blk_bg" class="skull_blk_bg"></div>
            </div>
            
        </div>
    )

}