import { createContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from 'react';
export type AuthContext = {
    token: string,
    isLogin: boolean
};
export const AuthInfoContext = createContext<[AuthContext, Dispatch<SetStateAction<AuthContext>>]>([{ token: "", isLogin: false }, () => { }]);
type Props = {
    children: ReactNode
}
function getAuthInfo(): AuthContext {
    const authToken = window.localStorage.getItem("SpotifyAccessToken");
    if (!!authToken) {
        return { token: authToken, isLogin: true } as AuthContext
    } else {
        return { token: "", isLogin: false } as AuthContext
    }
}
export const LoginFlagProvider = (props: Props) => {
    const { children } = props
    const [authInfo, setAuthInfo] = useState<AuthContext>(getAuthInfo());
    useEffect(() => {
        setAuthInfo((prevAuth: AuthContext) => ({
            ...prevAuth,
            isLogin: !!authInfo.token
        }));
    }, [authInfo.token])
    return (
        <AuthInfoContext.Provider value={[authInfo, setAuthInfo]}>
            {children}
        </AuthInfoContext.Provider>
    )
}
