import {useState, useEffect} from 'react';
import axios from 'axios';

export default function UserAuth(code){
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios.post("http://localhost:8888/login", {
            code
        }).then(res => {
            setAccessToken(res.data.access_token);
            setRefreshToken(res.data.refresh_token)
            setExpiresIn(res.data.expires_in);
            window.history.pushState({}, null, "/")
        }).catch((err) => {
            console.log(err)
            window.location = "/";

        })
    }, [code]);


    useEffect(() => {

        if(!refreshToken || !expiresIn){
           return;
        }else {
            const timer = setInterval(() => {
                axios.post("http://localhost:8888/refresh", {
                    refreshToken
                }).then(res => {
                    console.log(
                        res.data.access_token,
                        res.data.expires_in
                    )
                    setAccessToken(res.data.access_token);
                    setExpiresIn(res.data.expires_in)
                }).catch(err => {
                    console.log(err)
                    window.location = "/"
                })
            }, (expiresIn - 60) * 1000)

            return () => clearInterval(timer)
        }
        
    }, [refreshToken, expiresIn])





    return accessToken
}