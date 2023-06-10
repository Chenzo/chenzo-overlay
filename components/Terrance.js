import styles from "./Terrance.module.scss";
import { useState, useEffect, useRef } from "react";

export default function Terrance() {

    let rafId;
    let headShotType = 1;
    let audioContext, analyser, dataArray, source, canvas;
    let canvas2, ctx, ctx2, width, height, radius, num_items;
    let myThing, fftSize, smoothingTimeConstant;
    let running = false;
    let tilt = 0;
    let trans = 0;
    let lastTime = new Date();


    const [rafCount, setRafCount] = useState("000"); 
    const requestRef = useRef(null);
    const headRef = useRef(null);

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

        const head = headRef.current;
        //console.log(nub);

        if (head) {

            if (nub > 1) {
                head.classList.remove(styles.closed);
                //head.classList.add(styles.open);
                const nowTime = new Date();
                if (nowTime.getTime() - lastTime.getTime() >= 400) {
                    const random = Math.random();
                    tilt = random * 80 - 40;
                    trans = (tilt < 0) ? -10 : 10;
                    lastTime = nowTime;
                }
                head.style.transform = `rotate(${tilt}deg) translateX(${trans}px)`;
            } else {
                //const nowTime = new Date();
                //if (nowTime.getTime() - lastTime.getTime() >= 150) {
                //head.classList.remove(styles.open);
                ead.classList.add(styles.closed);
                head.style.transform = "rotate(0deg) translateX(0px)";
                //}
            }

            /* if (nub > 50) {
                document.getElementById("skull_top_open").classList.remove("hidden");
                document.getElementById("skull_top").classList.add("open");
                document.getElementById("skull_top_closed").classList.add("hidden");
            } else {
                document.getElementById("skull_top_open")?.classList.add("hidden");
                document.getElementById("skull_top")?.classList.remove("open");
                document.getElementById("skull_top_closed")?.classList.remove("hidden");
            }
            document.getElementById("skull_top").style.top = topi + "px";
            document.getElementById("skull_jaw").style.top = jawi + "px";
            document.getElementById("skull_bg").style.opacity = alf; */

        }


        if (running) { //This still runs even after the component is unmounted
            requestRef.current = requestAnimationFrame(tick);
            setRafCount(rafId);
        }
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
            <div className={styles.terrance}>
                <img ref={headRef} src="https://chenzorama.com/overlay/images/terrance_head.png" className={styles.head} />
                <img src="https://chenzorama.com/overlay/images/terrnace_body.png" className={styles.body} />
            </div>
        </>
    )

}