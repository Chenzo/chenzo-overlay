import styles from "./Header.module.scss";


export default function Header() {

    return (
        <header className={styles.chenzHeader}>
            <div className={`${styles.innerBar} ${styles.top_clip} windlass`}>
                <span className="dropshadow_effect_11x tshadow">The Gentlemen of Fortune and the Adventures of The Holy Bartender</span>
                <video width="1200" autoPlay={true} muted={true} loop={true}>
                    <source 
                        src="https://chenzorama.com/overlay/video/waterup.webm"
                        type="video/webm" />
                    </video>             
                </div>
                <div className={styles.alignment}>
                <img src="images/ribbon_evil.png" className={styles.evil}/>
                <img src="images/ribbon_good.png" className={styles.good}/>
                <img id="skullmeter" src="images/skull_meter.png" className={styles.skullmeter} />
                </div>
        </header>
    )

}