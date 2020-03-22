import React from 'react';
import Modal from 'react-modal';
import * as Styles from "./Styles";

const customStyles = {
  content : {
    top                   : '60%',
    left                  : '50%',
    width                  : '70%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -60%)'
  }
};

if (process.env.NODE_ENV !== 'test')   {
Modal.setAppElement('#root')
}
 
class PlaylistModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          addNew : false,
          newPlaylistName: ''
      };
    }

    updatePlaylistName = (e) => {
        this.setState({
            newPlaylistName: e.target.value
        });
    }

    handleKeyDown = (e) => {
        const { newPlaylist } = this.props;
        const { newPlaylistName } = this.state;
        if (e.key === 'Enter') {
            newPlaylist(newPlaylistName);
        }
    }

    addNewPlaylist = () => {
        this.setState({
            addNew: !this.state.addNew
        });
    }

    newPlaylistValidation = () => {
        const { newPlaylistName } = this.state;
        const { newPlaylist } = this.props;
        if(newPlaylistName) {
            newPlaylist(newPlaylistName);
        }else {
            alert('Please enter playlsit name.');
        }
        this.addNewPlaylist();
    }

    render() {
        const { closeModal, playlists, addToPlaylist, user } = this.props;
        const { addNew } = this.state;
        return (
        <Styles.ModalWrapper>
            <Modal
                isOpen={true}
                style={customStyles}
                contentLabel="Example Modal"
                overlayClassName="Overlay"
                >
                <Styles.ModalHeading>
                    <h3>Choose playlist</h3>
                </Styles.ModalHeading>
                <Styles.ModalBody>
                    {
                        playlists.length>0 && 
                            <Styles.Songs>
                                {
                                    playlists.map((playlist, ind) => {
                                        return <Styles.SongsList key={ind}>
                                                <Styles.SongTitle>
                                                    {playlist.name}
                                                </Styles.SongTitle>
                                                <Styles.SongAction type="button" onClick={() => addToPlaylist(playlist.id, (user.id === playlist.owner.id))}>
                                                    Add
                                                </Styles.SongAction>
                                            </Styles.SongsList>
                                    })
                                }
                            </Styles.Songs>
                    }
                    {
                        (!playlists.length) && 
                            <Styles.NoSongs>
                                No playlists found.
                            </Styles.NoSongs>
                    }
                </Styles.ModalBody>
                <Styles.ModalFooter>
                    <Styles.FooterActions>
                       <Styles.CloseModal type="button" onClick={closeModal}>
                            Close
                        </Styles.CloseModal>
                        <Styles.NewPlaylist type="button" onClick={this.addNewPlaylist}>
                            { !addNew ? 'New Playlist' : 'Cancel' }
                        </Styles.NewPlaylist>
                    </Styles.FooterActions>
                    {
                        addNew && (
                            <Styles.NewPlaylistDiv>
                                <Styles.NewPlaylistInput type="text" placeholder="Playlist name" onChange={this.updatePlaylistName} onKeyDown={this.handleKeyDown} maxLength="20"/>
                                <Styles.NewPlaylistAction type="button" onClick={this.newPlaylistValidation}>
                                    Create
                                </Styles.NewPlaylistAction>
                            </Styles.NewPlaylistDiv>
                        )
                    }
                </Styles.ModalFooter>
            </Modal>
        </Styles.ModalWrapper>
        );
    }
}

export default PlaylistModal;
