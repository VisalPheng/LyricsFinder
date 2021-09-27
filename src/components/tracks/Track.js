import React from 'react'
import { Link } from "react-router-dom";

const Track = props => {
    const { track } = props;

    return (
        <div className="flex justify-center my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <div className="w-full py-6 px-8 bg-white shadow-xl rounded-lg my-5">
                <h2 className="text-gray-800 text-xl font-bold">{track.artist_name}</h2>
                <p className="mt-2 text-gray-600">
                    <strong>
                    <i className='bx bxs-music text-xl'></i> Track
                    </strong>: {track.track_name}
                </p>
                <p className="mt-2 text-gray-600">
                    <strong>
                    <i className='bx bx-album text-xl'></i> Album
                    </strong>: {track.album_name}
                </p>
                <div className="flex justify-center pt-5">
                    <div className="w-full grid grid-col-12 gap-y-5 gap-x-2">
                        <Link to={`lyrics/track/${track.track_id}`} className="text-center col-span-12 rounded-lg bg-red-600 hover:bg-red-700 py-3 text-white font-bold px-4 rounded-full">
                            <i className='bx bxs-chevron-right-circle'></i> View Lyrics
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Track;