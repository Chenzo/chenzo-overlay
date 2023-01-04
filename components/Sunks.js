import styles from "./Sunks.module.scss";
import { useState, useEffect } from "react";



const Gall = <div className={`${styles.aship } ${styles.float}`}>
    <img src="images/sunk/galleon.png" />
</div>

const Brig = <div className={`${styles.aship } ${styles.float} ${styles.brig}`}>
    <img src="images/sunk/brig.png" />
</div>


const Sloop = <div className={`${styles.aship } ${styles.float} ${styles.sloop}`}>
    <img src="images/sunk/sloop.png" />
</div>



export default function Sunks({sunkShipArray}) {

    return (
        <div id="sunks" className={styles.sunks}>
            {sunkShipArray.map(function (shipType, index) {
                if (shipType == "galleon") {
                    return <div key={`ship-=${index}`} className={`${styles.ship_sinker} ${styles.sink}`}>
                        {Gall}
                    </div>
                } else if (shipType == "brig") {
                    return <div key={`ship-=${index}`} className={`${styles.ship_sinker} ${styles.sink}`}>
                        {Brig}
                    </div>
                } else if (shipType == "sloop") {
                    return <div key={`ship-=${index}`} className={`${styles.ship_sinker} ${styles.sink}`}>
                        {Sloop}
                    </div>
                }
            })}
        </div>
    )

}