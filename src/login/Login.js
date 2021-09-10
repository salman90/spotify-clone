import React from 'react';
import  "./login.css";
import { Container, Button } from 'react-bootstrap';


export default function Login(){

    function loginUser() {
        const clientID = '02b5daa354404b7babb50ae6ea28f667';
        const redirectUri = 'http://localhost:3000';
        const spotifyEndPoint = 'https://accounts.spotify.com/authorize';
        const spotifyURL = `${spotifyEndPoint}?client_id=${clientID}&response_type=code&redirect_uri=${redirectUri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&show_dialog=true`
        window.location.assign(spotifyURL);
    }

    return (
        <Container fluid className="login">
            <div className="imageConatiner ">
                <img className="spotifyBanner" src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="spotify banner" />
            </div>
            <div className="buttonConatiner">
                <Button style={{ borderColor: '#1db954',  backgroundColor: '#1db954', color: "#fff", testDecoration: 'none', padding: 20, borderRadius: 99, fontWeight: 800}} variant="primary"  onClick={loginUser}>Login With Spotify</Button>
            </div>
        </Container>
    )
} 