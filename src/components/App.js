import React from "react";
import axios from 'axios';
import Header from './Header';
import Loader from './Loader';
import PlaylistModal from './Modal';
import { authEndpoint, clientId, redirectUri, scopes } from "../config";
import * as Styles from "./Styles";

class App extends React.Component {
  constructor() {
    super();
    let token = sessionStorage.getItem('token');
    this.state = {
      error: false,
      token: token || null, 
      user : {},
      song: '',
      track: '',
      addedTrack: [],
      loading : false,
      results: [],
      playlists: [],
      initializeSearch: false,
      showModal: false,
      authorizeUrl: `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`
    };

  }
  componentDidMount() {
    const hash = this.getHash();
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
      sessionStorage.setItem('token', _token);
      this.getProfile(_token);
    }else {
      const {token} = this.state;
      if(token) {
        this.getProfile(token);
      }
    }
  }

  getHash = () => {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function(initial, item) {
        if (item) {
          var parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
      window.location.hash = "";
    return hash;
  }

  getProfile = (token) => {
    const headers = {
      'Authorization': "Bearer " + token
    }
    const url = 'https://api.spotify.com/v1/me/';
    axios.get(url, {headers})
      .then((response) => {
        if(response.error) {
          sessionStorage.removeItem('token');
          window.location = this.state.authorizeUrl;
        }
        console.table(response.data);
        this.setState({
          user: response.data,
        });
      })
      .catch((error) => {
        console.table('User not found', error);
        sessionStorage.removeItem('token');
        window.location = this.state.authorizeUrl;
        this.setState({
          error: true,
        });
      })
  }

  updateSong = (e) => {
    this.setState({
      song: e.target.value
    });
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.searchSong(e)
    }
  }

  searchSong = () => {
    const { token, song } = this.state;
    if(song) {
      this.setState({
        loader: true,
        initializeSearch: true
      });
      const headers = {
        'Authorization': "Bearer " + token
      }
      const url = `https://api.spotify.com/v1/search?q=${song}&type=track&limit=10`;
      axios.get(url, {headers})
        .then((response) => {
          if(response.error) {
            sessionStorage.removeItem('token');
            window.location = this.state.authorizeUrl;
          }
          console.table(response.data);
          if(response && response.data && response.data.tracks && response.data.tracks.items ) {
            this.setState({
              results: response.data.tracks.items,
              loader: false
            });
          }else {
            this.setState({
              results: [],
              loader: false
            });
          }
        })
        .catch((error) => {
          console.table('Song not found', error);
          this.setState({
            results: [],
            loader: false
          });
        })
    }else {
      alert('Please enter something...');
    }
  }

  showPlaylists = (track) => {
    this.setState({
      showModal : true,
      track
    });
    const {token} = this.state;
    const headers = {
      'Authorization': "Bearer " + token
    }
    const url = `https://api.spotify.com/v1/me/playlists`;
    axios.get(url, {headers})
      .then((response) => {
        if(response.error) {
          sessionStorage.removeItem('token');
          window.location = this.state.authorizeUrl;
        }
        if(response && response.data && response.data.items ) {
          this.setState({
            playlists: response.data.items,
          });
        }else {
          this.setState({
            playlists: [],
          });
        }
      })
      .catch((error) => {
        console.table('Playlists not found', error);
        sessionStorage.removeItem('token');
        window.location = this.state.authorizeUrl;
        this.setState({
          playlists: [],
        });
      })
  }

  closeModal = () => {
    this.setState({
      showModal : false
    });
  }

  newPlaylist = (playlistName) => {
    console.log(playlistName);
    if(playlistName) {
      const {token, user, track} = this.state;
      const headers = {
        'Authorization': "Bearer " + token
      }
      const url = `https://api.spotify.com/v1/users/${user.id}/playlists`;
      const postData = {
        "name": playlistName,
        "description": `${playlistName} description`,
        "public": false
      }
      axios.post(url, postData, {headers})
        .then((response) => {
          if(response.error) {
            sessionStorage.removeItem('token');
            window.location = this.state.authorizeUrl;
          }
          if(response && response.data && response.data.uri ) {
            this.showPlaylists(track);
          }else {
            this.setState({
              showModal : false,
            });
          }
        })
        .catch((error) => {
          console.table('Unable to create a new playlist', error);
          sessionStorage.removeItem('token');
          window.location = this.state.authorizeUrl;
          this.setState({
            showModal : false
          });
        })
    }
  }

  addToPlaylist = (playlist, canAdd) => {
    if(!canAdd) {
      alert('Looks like it is not your own playlist.');
    }else {
      const {track, token, addedTrack} = this.state;
      console.table(track);
      console.table(playlist);
      if(track && playlist) {
        const headers = {
          'Authorization': "Bearer " + token
        }
        const url = `https://api.spotify.com/v1/playlists/${playlist}/tracks?uris=${track}`;
        axios.post(url, {}, {headers})
          .then((response) => {
            if(response.error) {
              sessionStorage.removeItem('token');
              window.location = this.state.authorizeUrl;
            }
            if(response && response.data && response.data.snapshot_id ) {
              const newTrackArray = addedTrack;
              newTrackArray.push(track) 
              this.setState({
                addedTrack: newTrackArray
              });
            }else {
              this.setState({
                addedTrack: [],
              });
            }
          })
          .catch((error) => {
            console.table('Unable to add track to playlist', error);
            this.setState({
              addedTrack: [],
            });
          })
      }else {
        alert('Oops, there seems to be a problem.');
      }
      this.closeModal();
    }
  }

  render() {
    const { authorizeUrl, token, loader, results, error, initializeSearch, showModal, playlists, addedTrack, user} = this.state;
    return (
      <Styles.Wrapper>
        <Header />
        <Styles.Container>
          {
            !token && 
              <Styles.Jumbo>
                  <Styles.JumboText>
                    Looking for music?
                  </Styles.JumboText>
                  <Styles.Login href={authorizeUrl} >
                    Login to Spotify
                  </Styles.Login>
              </Styles.Jumbo>
          }
          {
            (token && !error) && 
              <Styles.SearchWrapper>
                   <Styles.SearchSection>
                      <Styles.SearchText>
                        Looking for music?
                      </Styles.SearchText>
                      <Styles.SearchBox type="text" placeholder="Search song here..." onChange={this.updateSong} onKeyDown={this.handleKeyDown} />
                      <Styles.SearchButton type="button" onClick={this.searchSong}>Search</Styles.SearchButton>
                   </Styles.SearchSection>
                   <Styles.ResultsSection>
                      {
                        loader ?
                            <Loader /> 
                            :
                            <Styles.Songs>
                              {
                                results.map((song, ind) => {
                                  return <Styles.SongsList key={ind}>
                                    <Styles.SongTitle>
                                      {song.name}
                                    </Styles.SongTitle>
                                    <Styles.SongAction type="button" onClick={() => { if(addedTrack.indexOf(song.uri) < 0) this.showPlaylists(song.uri)}} >
                                        {(addedTrack.indexOf(song.uri) > -1) ? 'Added' : 'Add to playlist'}
                                    </Styles.SongAction>
                                  </Styles.SongsList>
                                })
                              }
                              {
                                (initializeSearch && !results.length) && 
                                  <Styles.NoSongs>
                                      No songs found for the given search.
                                  </Styles.NoSongs>
                              }
                            </Styles.Songs>
                      }
                   </Styles.ResultsSection>
              </Styles.SearchWrapper>
          }
          {
            (token && error) && <Styles.Error>Unable to fetch user details, please try again....</Styles.Error>
          }
          {
            showModal && 
             <PlaylistModal user={user} closeModal={this.closeModal} playlists={playlists} newPlaylist={this.newPlaylist} addToPlaylist={this.addToPlaylist}/>
          }
        </Styles.Container>
      </Styles.Wrapper>
    );
  }
}

export default App;
