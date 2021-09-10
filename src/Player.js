import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';


export default function Player(props){
    const [play, setPlay] = useState(false)
    useEffect(() => {
        setPlay(true)
    }, [props.trackToPlay.uri])
    return (
        <SpotifyPlayer 
            token={props.accessToken}
            uris={[props.trackToPlay.uri]}
            callback={state => {
                if (!state.isPlaying) setPlay(false)
            }}
            play={play}
        />
    )
}