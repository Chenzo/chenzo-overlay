import styles from "./ChatScroller.module.scss";
import { useState, useEffect } from "react";
import ChatPhrase from "./ChatPhrase";

export default function ChatScroller({lastChat}) {

    const [newPhrase, setNewPhrase] = useState(false);

    useEffect(() => {
        let newPhrase = <ChatPhrase key={lastChat.id} usr={lastChat.usr} msg={lastChat.msg} emotes={lastChat.emotes} />
        setNewPhrase(newPhrase)
    }, [lastChat]);

    return (
        <div className={`${styles.chatSpace}`}>
            {newPhrase}
        </div>
    )

}