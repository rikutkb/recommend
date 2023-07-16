import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
export type PlayingContext = {
    musicID: string,
    isPlaying: boolean
};
export const PlayingInfoContext = createContext<[PlayingContext, Dispatch<SetStateAction<PlayingContext>>]>([{ musicID: "", isPlaying: false }, () => { }]);

export const CountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [musicID, setMusicID] = useState<PlayingContext>({ musicID: "", isPlaying: false });
    return (
        <PlayingInfoContext.Provider value={[musicID, setMusicID]} >
            {children}
        </PlayingInfoContext.Provider >
    )
}
