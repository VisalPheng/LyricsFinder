import React, { Component } from 'react'
import axios from 'axios';
import Spinner from '../layouts/Spinner';
import { Link } from "react-router-dom";

class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {}
    }

    componentDidMount() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            this.setState({ lyrics: res.data.message.body.lyrics });

            return axios.get(
                `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
            );
        })
        .then(res => {
            this.setState({ track: res.data.message.body.track });
        })
        .catch(err => console.log(err));
    }

    render() {
        const { track, lyrics } = this.state;

        if(
            track === undefined ||
            lyrics === undefined ||
            Object.keys(track).length === 0 ||
            Object.keys(lyrics).length === 0
        ) {
            return <Spinner />
        } else {
            return (
                <React.Fragment>
                    <div className="w-full grid grid-col-12 gap-y-5 gap-x-2">
                        <Link to={`/`} className="text-center col-start-11 rounded-lg bg-red-600 hover:bg-red-700 py-3 text-white font-bold px-4 rounded-full">
                            <i className='bx bxs-chevron-left-circle'></i> Back
                        </Link>
                    </div>
                    <div className="rounded overflow-hidden shadow-lg p-4 my-5">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{track.track_name} by {' '} {track.artist_name}</div>
                            <p className="text-gray-700 text-base">{lyrics.lyrics_body}</p>
                        </div>
                    </div>
                    <div className="rounded overflow-hidden shadow-lg p-4 my-5">
                        <div className="px-6 py-4">
                            <ul className="list-disc">
                                <li><strong>Album ID:</strong> {track.album_id}</li>
                                <li><strong>Explicit Words:</strong> {track.explicit === 0 ? 'No' : 'Yes'} </li>
                                <li><strong>Rating:</strong> {track.track_rating}</li>
                            </ul>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default Lyrics;