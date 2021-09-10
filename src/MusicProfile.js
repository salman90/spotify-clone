import {useEffect, useState} from 'react';
import { Container, Form } from 'react-bootstrap';
import UserAuth from './userAuth';
import SpotifyWebApi from "spotify-web-api-node";
import TrackItem from './TrackItem';
import Player from './Player';


const spotifyApi = new SpotifyWebApi({
    clientId: '02b5daa354404b7babb50ae6ea28f667',
})


export default function MusicProfile(props){
    const accessToken = UserAuth(props.code);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [trackToPlay, setTrackToPlay] = useState({});
    const [shouldPlay, setShouldPlay] = useState(false);
    useEffect(() => {
        if(!accessToken) return;
        spotifyApi.setAccessToken(accessToken);

    }, [accessToken]);


    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        spotifyApi.searchTracks(search)
        .then(res => {
            let items = res.body.tracks.items
            setSearchResults(items.map(track => {
                let image = track.album.images.length > 0 ? track.album.images[0] : {};
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumImage: image
                }
            }))
        }).catch(err => {
            console.log(err)
        })
    }, [search, accessToken])

    const handleTrackClick = (track) => {
        setShouldPlay(true)
        setTrackToPlay(track);
        setSearch("");
    }

    return (
        <Container>
            <Form.Control
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value) }
            />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
            {
                searchResults.length > 0 ?
                    searchResults.map(track => {
                        return (
                            <TrackItem 
                                track={track}
                                key={track.uri}
                                handleTrackClick={handleTrackClick}
                            />
                        )
                    })
                    :
                    <p>No tracks</p>
            }
            </div>
            {
                shouldPlay ?
                <div>
                    <Player accessToken={accessToken} trackToPlay={trackToPlay} />
                </div>
                :
                null
            }

        </Container>
    )
}