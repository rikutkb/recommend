import React, { useEffect, useRef, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SpotifyAPIToken, UserProfile } from './Types';
import { useNavigate } from "react-router-dom";
import { AuthInfoContext, AuthContext } from '../providers/loginProvider';

const Callback: React.FC = () => {
  // eslint-disable-next-line
  const [_, setAuthInfo] = useContext(AuthInfoContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const refFirstRef = useRef(true);
  const navigate = useNavigate();
  const [success, setSuccess] = useState<boolean>(true);
  useEffect(() => {
    // 認証コードや状態を使用してアクセストークンを取得する処理などを行う
    // ...
    if (process.env.NODE_ENV === "development") {
      if (refFirstRef.current) {
        refFirstRef.current = false;
        return;
      }
    }
    // TODO リファクタリング
    // apiによって取得を行なっている部分とlocalStorage部分に保存している部分を分離
    const fetchToken = async () => {
      const headers: { [key: string]: string } = {
        'Content-type': 'application/x-www-form-urlencoded'
      }
      const obj: { [key: string]: string } = {
        'grant_type': 'authorization_code',
        'code': code as string,
        'redirect_uri': `${process.env.REACT_APP_HOST}/callback`
      }
      const method = 'POST';
      const body = Object.keys(obj).map((key) => key + "=" + encodeURIComponent(obj[key])).join("&");
      const response = await fetch(`${process.env.REACT_APP_PROXY_PATH}/api/token`, { method, headers, body, mode: "cors", credentials: 'include' });
      if (response.status !== 200) {
        setSuccess(false);
        throw new Error("認証に失敗しました。")
      }
      const tokenJson: SpotifyAPIToken = await response.json();
      localStorage.setItem("SpotifyAccessToken", tokenJson.access_token)
      localStorage.setItem("SpotifyRefreshToken", tokenJson.refresh_token)
      setAuthInfo({ token: tokenJson.access_token, isLogin: true } as AuthContext);
    };
    const fetchUserInfo = async () => {
      const response = await fetch(`https://api.spotify.com/v1/me`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("SpotifyAccessToken")}` }
      });
      const userJson: UserProfile = await response.json();
      localStorage.setItem("SpotifyUserID", userJson.id);
      localStorage.setItem("SpotifyUserName", userJson.display_name);
    }
    fetchToken().then(() => {
      fetchUserInfo();
    })
      .then(() => {
        setTimeout(() => {
          navigate('/recommend');
        }, 1000);
      });
    // eslint-disable-next-line
  }, [code, navigate]);

  return (
    <div>
      {success ? <p>認証に成功しました。</p> : <p>ログインに失敗しました。</p>}

    </div>
  );
}

export default Callback;
