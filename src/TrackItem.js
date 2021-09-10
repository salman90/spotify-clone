
export default function TrackItem(props) {
    const handleTrackClick = (e) => {
        props.handleTrackClick(props.track);
    }
    return(
        <div  
          className="d-flex m-2 align-items-center"
          style={{cursor: "pointer"}}
          onClick={handleTrackClick}
        >
            <img
                src={props.track.albumImage.url}
                style={{width: 60, height: 60}}
            />
            <div className="ml-3" style={{marginLeft: 2}}>
                <div>{props.track.title}</div>
                <div className="text-muted">{props.track.artist}</div>
            </div>
        </div>
    )
}