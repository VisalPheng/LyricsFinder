import React, { Component } from 'react'
import { Consumer } from '../../context';
import Spinner from '../layouts/Spinner';
import Track from '../tracks/Track';

class Tracks extends Component {
    render() {
        return (
            <Consumer>
                {value=>{
                    const { track_list, heading } = value;
                    if( track_list === undefined || track_list.length === 0 ) {
                        return <Spinner />
                    } else {
                        return (
                            <React.Fragment>
                                <h3 className="text-center pt-10 my-4 font-bold text-4xl">{heading}</h3>
                                <div className="container my-12 mx-auto px-4 md:px-12">
                                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                                        {track_list.map(item => (
                                            <Track key={item.track.track_id} track={item.track} />
                                        ))}
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    }
                }}
            </Consumer>
        )
    }
}

export default Tracks;