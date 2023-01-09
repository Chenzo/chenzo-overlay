import styles from "./ChatScroller.module.scss";
import { useState, useEffect } from "react";
import ChatPhrase from "./ChatPhrase";

export default function ChatScroller({lastChat}) {

    /* const [chats, setChats] = useState([]);

    const [newChat, setNewChat] = useState();
    const [oldChat, setOldChat] = useState();
    const [fading, setFading] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    let chatTimer = 0; */

    const [newPhrase, setNewPhrase] = useState(false);

    useEffect(() => {
        console.log("new chat");
        let newPhrase = <ChatPhrase key={lastChat.id} usr={lastChat.usr} msg={lastChat.msg} emotes={lastChat.emotes} />
        setNewPhrase(newPhrase)
    }, [lastChat]);




    return (
        <div className={`${styles.chatSpace}`}>
            {newPhrase}
        </div>
    )

}