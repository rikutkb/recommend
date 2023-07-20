import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
export type PlayingContext = {
    musicID: string
};
export const PlayingInfoContext = createContext<[PlayingContext, Dispatch<SetStateAction<PlayingContext>>]>([{} as PlayingContext, () => { }]);

type Props = {
    children: ReactNode;
};

export const PlayerProvider: React.FC<Props> = (props) => {
    const { children } = props;

    const [playingContext, setContext] = useState<PlayingContext>({ musicID: "" } as PlayingContext);
    return (
        <PlayingInfoContext.Provider value={[playingContext, setContext]} >
            {children}
        </PlayingInfoContext.Provider >
    )
}
