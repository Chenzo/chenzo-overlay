import styles from "./Skully.module.scss";
import { useState, useEffect } from "react";

export default function Skully() {

    let rafId;
    let headShotType = 1;
    let audioContext, analyser, dataArray, source, canvas;
    let canvas2, ctx, ctx2, width, height, radius, num_items;
    let myThing, fftSize, smoothingTimeConstant;

    const [rafCount, setRafCount] = useState("000"); 

    const tick = function() {
        analyser.getByteFrequencyData(dataArray);

        let i = 0;
        let jawi = i + 109
        let topi = 13;
        let alf = 0;
        let soundlimit = 8;
        var pastNub = 0;
        var distancelimit = 3;

        var l = dataArray.length;
        var sum = dataArray.reduce(function(a, b){
            return a + b;
        }, 0);

        var nub = ~~(sum / l);
        //document.getElementById("numoutput").innerHTML= nub;

        if (nub > pastNub + distancelimit || nub < pastNub - distancelimit) {
            pastNub = nub;
            nub = (nub - soundlimit < 0) ? 0 : nub - soundlimit;
            jawi = (nub * .4) + 109;
            topi = 13 - (nub/10);
            alf = (nub *1.5) * .01;
        }

        if (nub > 50) {
            document.getElementById("skull_top_open").classList.remove("hidden");
            document.getElementById("skull_top").classList.add("open");
            document.getElementById("skull_top_closed").classList.add("hidden");
        } else {
            document.getElementById("skull_top_open").classList.add("hidden");
            document.getElementById("skull_top").classList.remove("open");
            document.getElementById("skull_top_closed").classList.remove("hidden");
        }
        document.getElementById("skull_top").style.top = topi + "px";
        document.getElementById("skull_jaw").style.top = jawi + "px";
        document.getElementById("skull_bg").style.opacity = alf;

        rafId = requestAnimationFrame(tick);
        setRafCount(rafId);
        //myThing.innerHTML = "rafId: " + rafId;
    };

    const getAudio = () => {
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {
            // Handle the incoming audio stream
            audioContext = new (window.AudioContext ||
                window.webkitAudioContext)();
             //this.micDelay = this.audioContext.createDelay(0);
            analyser = audioContext.createAnalyser();
            analyser.minDecibels = -90;
            analyser.maxDecibels = -10;
            analyser.smoothingTimeConstant = smoothingTimeConstant;
            analyser.fftSize = fftSize;
            dataArray = new Uint8Array(analyser.frequencyBinCount);
            //var bufferLength = analyser.frequencyBinCount;
            source = audioContext.createMediaStreamSource(stream);
            //this.micDelay.delayTime.value = this.props.audioDelayTime; //somewhere around 1
            source.connect(analyser);
    
            rafId = requestAnimationFrame(tick);
    
            }, error => {
            // Something went wrong, or the browser does not support getUserMedia
        });
    }

    useEffect(() => {
        console.log("listen to MIC for scullly");
        fftSize = 64;
        smoothingTimeConstant = 0.2;
        getAudio();
    }, []);

    return (
        <>
            <div className={`${styles.imageContainer} ${styles.circleContainer}`}>
                <div id="skull_bg" className={`${styles.skull_bg}`}></div>
                <div id="skull_blk_bg" className={`${styles.skull_blk_bg}`}></div>
            </div>

            <div className={styles.skully}>
                <div  id="skull_top"  className={styles.skull_top}>
                    <div  className={styles.eyes}>
                        <div className={`${styles.lefty} ${styles.eye}`}></div>
                        <div className={`${styles.righty} ${styles.eye}`}></div>
                    </div>
                    <img id="skull_top_open" src="https://chenzorama.com/overlay/images/skully_top_open.png" className={styles.top_open} />
                    <img id="skull_top_closed" src="https://chenzorama.com/overlay/images/skully_top_closed.png" className={styles.top_closed} />
                </div>
                <img id="skull_jaw" src="https://chenzorama.com/overlay/images/skully_jaw.png" className={styles.jaw} />
            </div>
        </>
    )

}