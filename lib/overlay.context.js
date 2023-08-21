import { createContext, useContext, useState, useEffect } from "react";

const OverlayContext = createContext();

export function OverlayWrapper({ children }) {
    const [latestFollowers, setLatestFollowers] = useState("-");

    let sharedState = {
        latestFollowers,
        setLatestFollowers
    };

    return <OverlayContext.Provider value={sharedState}>{children}</OverlayContext.Provider>;
}

export function useOverlayContext() {
    return useContext(OverlayContext);
}
