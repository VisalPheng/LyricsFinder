import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    trackTitle: "",
  };

  findTrack = (dispatch, e) => {
    e.preventDefault();

    axios
      .get(
        `https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=12&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list,
        });

        this.setState({ trackTitle: "" });
      })
      .catch((err) => console.log(err));
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="flex justify-center">
              <div className="w-10/12 py-6 px-8 bg-white shadow-xl rounded-lg my-5">
                <h2 className="text-4xl font-bold text-center my-5">
                  <i className="bx bxs-music text-4xl"></i> Search your favorite
                  song lyrics
                </h2>
                <p className="text-xl text-center my-5">
                  Get lyrics for any songs
                </p>
                <form onSubmit={this.findTrack.bind(this, dispatch)}>
                  <div className="bg-white shadow p-4 flex">
                    <span className="w-auto flex justify-end items-center text-gray-500 p-2">
                      <i className="bx bx-search-alt text-3xl"></i>
                    </span>
                    <input
                      className="w-full rounded p-2"
                      type="text"
                      placeholder="Song Title..."
                      name="trackTitle"
                      value={this.state.trackTitle}
                      onChange={this.onChange}
                    />
                    <button className="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4">
                      <button type="submit" className="font-semibold text-xs">
                        Search
                      </button>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
