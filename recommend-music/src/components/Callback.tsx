import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function Callback() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const refFirstRef = useRef(true);

  useEffect(() => {
    // 認証コードや状態を使用してアクセストークンを取得する処理などを行う
    // ...
    if (process.env.NODE_ENV === "development") {
      if (refFirstRef.current) {
        refFirstRef.current = false;
        return;
      }
    }
  
    const fetchToken = async () => {
        const headers: {[key: string]: string} = {
            'Content-type': 'application/x-www-form-urlencoded'
          }
          const obj: {[key: string]: string} = {
            'grant_type': 'authorization_code',
            'code': code as string,
            'redirect_uri': '/callback'
          }
        const method = 'POST';
        const body = Object.keys(obj).map((key)=>key+"="+encodeURIComponent(obj[key])).join("&");
        const response = await fetch(`${process.env.REACT_APP_PROXY_PATH}/api/token`,{method, headers, body, mode: "cors",credentials: 'include'});
        console.log(response);

    };
      console.log("hey")

      fetchToken();

    

  }, []);

  return (
    <div>
      {/* コールバック後のページのコンテンツを表示 */}
      <p>認証が完了しました。</p>
    </div>
  );
}

