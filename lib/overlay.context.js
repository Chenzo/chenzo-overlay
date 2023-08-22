import { createContext, useContext, useState, useEffect } from "react";

const OverlayContext = createContext();

export function OverlayWrapper({ children }) {
    const [latestFollowers, setLatestFollowers] = useState("-");
    const [lastChat, setLastChat] = useState({id: "123fsd", usr: "Twitch", msg: "Chat Initializing"});

    let sharedState = {
        latestFollowers,
        setLatestFollowers,
        lastChat,
        setLastChat
    };

    return <OverlayContext.Provider value={sharedState}>{children}</OverlayContext.Provider>;
}

export function useOverlayContext() {
    return useContext(OverlayContext);
}
