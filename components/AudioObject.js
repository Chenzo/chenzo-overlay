import { useState, useEffect } from "react";

export default function AudioObject({currentAudio, setCurrentAudio}) {

    let theAudio;
    const [isPlaying, setIsPlaying] = useState(false); 

    const findAndPlay = (audioName) => {
        theAudio = new Audio()
        if (audioName == "babyshark") {
            theAudio.src = "https://chenzorama.com/overlay/audio/babyshark.mp3";  
            theAudio.volume = 1;
        } else if (audioName == "digs") {
            theAudio.src = "https://chenzorama.com/overlay/audio/dogs.mp3";
            theAudio.volume = 1;
        } else if (audioName == "3") {
            theAudio.src = "https://chenzorama.com/overlay/audio/umm-3.mp3";
            theAudio.volume = 1;
        } else if (audioName == "sharkbait") {
            theAudio.src = "https://chenzorama.com/overlay/audio/sharkbait.mp3";
            theAudio.volume = 1;
        } else if (audioName == "carl") {
            theAudio.src = "https://chenzorama.com/overlay/audio/carl.mp3";
            theAudio.volume = 0.7;
        } else if (audioName == "wind") {
            theAudio.src = "https://chenzorama.com/overlay/audio/wind.mp3";
            theAudio.volume = 0.5;
        } else if (audioName == "chunky") {
            theAudio.src = "https://chenzorama.com/overlay/audio/chunky.mp3";
            theAudio.volume = 0.7;
        } else if (audioName == "fire") {
            theAudio.src = "https://chenzorama.com/overlay/audio/fire.mp3";
            theAudio.volume = 0.3;
        } else if (audioName == "sosalty") {
            theAudio.src = "https://chenzorama.com/overlay/audio/sosalty.mp3";
            theAudio.volume = 0.2;
        } else if (audioName == "forgiveness") {
            theAudio.src = "https://chenzorama.com/overlay/audio/forgiveness.mp3";
            theAudio.volume = 0.7;
        } else if (audioName == "scooty") {
            theAudio.src = "https://chenzorama.com/overlay/audio/booty_scooty.mp3";
            theAudio.volume = 0.7;
        } else if (audioName == "warrenty") {
            theAudio.src = "https://chenzorama.com/overlay/audio/warrenty.mp3";
            theAudio.volume = 1;
        } else if (audioName == "blastem") {
            theAudio.src = "https://chenzorama.com/overlay/audio/blast-them.mp3";
            theAudio.volume = 1;
        }  
        

        theAudio.addEventListener("ended", function() {
            setCurrentAudio("")
            setIsPlaying(false)
        })
        setIsPlaying(true)
        theAudio.play();
    }


    useEffect(() => {
        if (!isPlaying && currentAudio != "") {
            findAndPlay(currentAudio);
        }
    }, [currentAudio]);

    

    return (
        null
    )

}