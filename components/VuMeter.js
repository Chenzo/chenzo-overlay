import styles from "./VuMeter.module.scss";
import { useState, useEffect, useRef } from "react";

export default function VuMeter() {

    let audioContext, analyser, dataArray, source;
    let fftSize, smoothingTimeConstant;
    let running = false;
    let tilt = 0;
    let trans = 0;
    let lastTime = new Date();

    const requestRef = useRef(null);
    const needleone = useRef(null);
    const needletwo = useRef(null);
    const lightone = useRef(null);
    const lighttwo = useRef(null);
    const lightthree = useRef(null);
    const lightfour = useRef(null);
    const leftbg = useRef(null);
    const rightbg = useRef(null);

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

        if (nub > pastNub + distancelimit || nub < pastNub - distancelimit) {
            pastNub = nub;
            nub = (nub - soundlimit < 0) ? 0 : nub - soundlimit;
            jawi = (nub * .4) + 109;
            topi = 13 - (nub/10);
            alf = (nub *1.5) * .01;
        }

        const n1 = needleone.current;
        const n2 = needletwo.current;
        const l1 = lightone.current;
        const l2 = lighttwo.current;
        const l3 = lightthree.current;
        const l4 = lightfour.current;
        const lb = leftbg.current;
        const rb = rightbg.current;

        if (n1) {
            if (nub > 10) {
                n1.classList.add(styles.active);
                n2.classList.add(styles.active);
                //lightone.current.classList.add(styles.active);
                tilt = -40 + (nub * 1.2);               
                if (tilt > 40) {
                    tilt = 40;
                }
                const random = Math.random();
                
                let tilt2 = tilt + parseInt(random * 4 - 2);
                n1.style.transform = `rotate(${tilt}deg)`;
                n2.style.transform = `rotate(${tilt2}deg)`;
                l1.style.opacity = (nub * 0.05);
                l2.style.opacity = (nub * 0.05);
                l3.style.opacity = (nub * 0.05);
                l4.style.opacity = (nub * 0.05);
                lb.style.opacity = 0;
                rb.style.opacity = 0;

            } else {
                n1.classList.remove(styles.active);
                n1.style.transform = "rotate(-40deg)";
                n2.classList.remove(styles.active);
                n2.style.transform = "rotate(-40deg)";
                //lightone.current.classList.remove(styles.active);
                l1.style.opacity = 0;
                l2.style.opacity = 0;
                l3.style.opacity = 0;
                l4.style.opacity = 0;
                lb.style.opacity = 0.2;
                rb.style.opacity = 0.2;
            }

        }


        if (running) { //This still runs even after the component is unmounted
            requestRef.current = requestAnimationFrame(tick);
        }
    };

    const getAudio = () => {
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {
            audioContext = new (window.AudioContext ||
                window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            analyser.minDecibels = -90;
            analyser.maxDecibels = -10;
            analyser.smoothingTimeConstant = smoothingTimeConstant;
            analyser.fftSize = fftSize;
            dataArray = new Uint8Array(analyser.frequencyBinCount);
            source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
    
            requestRef.current = requestAnimationFrame(tick);
    
            }, error => {
            // Something went wrong, or the browser does not support getUserMedia
        });
    }

    useEffect(() => {
        console.log("listen to MIC for terrance");
        fftSize = 64;
        smoothingTimeConstant = 0.2;
        running = true;
        getAudio();
        
        return () => {
            console.log("stop listening to MIC for terrance");
            cancelAnimationFrame(requestRef.current);
            running = false;
        }
    }, []);

    return (
        <>
            <div className={styles.vumeter}>
                <article className={styles.power}>
                    <div ref={leftbg} className={styles.left}></div>
                    <div ref={rightbg} className={styles.right}></div>
                </article>

                <article className={styles.controls}>
                    <aside className={styles.needleHolder}>
                        <div ref={needleone} className={styles.needle}></div>
                    </aside>
                    <aside className={styles.lights}>
                        <div ref={lightone} className={styles.light}></div>
                        <div ref={lighttwo} className={`${styles.light} ${styles.two}`}></div>
                        <div ref={lightthree} className={`${styles.light} ${styles.three}`}></div>
                        <div ref={lightfour} className={`${styles.light} ${styles.four}`}></div>
                    </aside>
                    <div className={`${styles.needleHolder} ${styles.right}`}>
                        <div ref={needletwo} className={styles.needle}></div>
                    </div>
                    
                </article>
                <div className={styles.bgholder}>
                    <img src="https://chenzorama.com/overlay/images/vu_meter.jpg" className={styles.bg} />
                </div>
            </div>
        </>
    )

}