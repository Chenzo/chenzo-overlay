import styles from "./CircleAudioBars.module.scss";
import { useState, useEffect } from "react";

export default function CircleAudioBars() {

    let rafId;
    let headShotType = 1;
    let audioContext, analyser, dataArray, source, canvas;
    let canvas2, ctx, ctx2, width, height, radius, num_items;
    let particles = [];
    let myThing, fftSize, smoothingTimeConstant;

    const [rafCount, setRafCount] = useState("000"); 

    const tick = function() {
        analyser.getByteFrequencyData(dataArray);
        drawBars(ctx, dataArray);
        drawBars(ctx2, dataArray);
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

    const drawBars = function(ctx, dataArray) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        for (const [i, s] of dataArray.entries()) {
    
            var p = particles[i];
            var vol = (s < 120) ? s : 121;
            var ss = Math.abs(vol / 2 );
    
            if (typeof p != "undefined") {
                var x2 = width/2 + Math.cos(p.angle) * (ss + radius);
                var y2 = height/2 + Math.sin(p.angle) * (ss + radius);
    
                ctx.beginPath();
                var gradient = ctx.createRadialGradient(2100,250,20, 250,250,175);
    
                gradient.addColorStop("0", "#0e2b28");
                gradient.addColorStop("0.5", "#0e2b28");
                gradient.addColorStop("1.0", "#267e81"); 
    
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 6;
    
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            } 
    
        }
    };

    const makeAngles = function() {
        
        function radians(deg) {return deg*Math.PI/180;};
    
        function distributeAngles(me, total) {
            return me/total * 180 - 90;
        }
    
        for (var i = 0; i < num_items; i++) {
            var angle = radians(distributeAngles(i, num_items));
            particles[i] = {
                x: width/2 + Math.cos(angle) * radius,
                y: height/2 + Math.sin(angle) * radius,
                angle: angle
            }
        }
    };

    const setInitialValues = function() {
        canvas = document.getElementById("circle-canvas");
        canvas2 = document.getElementById("circle-canvas-2");
        ctx = canvas.getContext('2d');
        ctx2 = canvas2.getContext('2d');
        width = canvas.width;
        height = canvas.height;
        radius = 100;
        num_items = 40;
        myThing = document.getElementById("countdown");
    };


    useEffect(() => {
        console.log("listen to MIC");
        fftSize = 128;
        smoothingTimeConstant = 0.8;
        setInitialValues();
        makeAngles();
        getAudio();
        return function cleanup() {
            console.log("this should be where we stop it")
        };
    }, []);


    return (
        <div>
            <div className={`${styles.audioContainer}`}>
                <canvas width="500" height="500" id="circle-canvas"></canvas>
            </div>
            <div className={`${styles.audioContainer} ${styles.flipped}`}>
                <canvas width="500" height="500" id="circle-canvas-2"></canvas>
            </div>
        </div>
    )

}



