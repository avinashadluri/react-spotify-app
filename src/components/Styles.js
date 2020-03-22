import styled from 'styled-components'

const brandColor = '#1DB954';
const brandColorWhite = '#FFF';

export const Wrapper = styled.div`
    width:100%;
    height:100%;
    padding:0;
    margin:0;
`;

export const Container = styled.div`
    // height:80%;
    min-height:80%;
    padding:4%;
    margin:0;
    background: linear-gradient(0deg, #f6cb6c 20%, #f3c65d 65%, #f2ae54 100%);
    text-align:center;
`;

export const HeaderWrapper = styled.div`
    background-color: #060606;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
`;

export const HeaderText = styled.div` 
    color: #FFF;
    font-size: 23px;
    font-weight: bold;
    padding: 20px;
`;

export const Error = styled.h1` 
    color: #000;
    font-size: 23px;
    font-weight: bold;
    padding: 20px;
`;

export const Jumbo = styled.div`
    display: block;
`;

export const JumboText = styled.h2` 
    color: #000000;
    font-size: 80px;
    font-weight: bold;
`;

export const Loader = styled.div`
    display: block;
    text-align: center;
`;

export const LoaderText = styled.p`
    font-weight: bold;
    color: #060606;
`;

export const Login = styled.a`
    color: ${brandColorWhite};
    background-color: ${brandColor};
    font-size: 16px;
    font-weight: bold;
    line-height: 1;
    border-radius: 500px;
    padding: 19px 56px 21px;
    transition-duration: .3s;
    border-width: 0;
    letter-spacing: 2px;
    min-width: 160px;
    text-transform: uppercase;
    white-space: normal;
    text-decoration: none;
    &:hover {
        background-color: #08772f;
    }
    cursor: pointer;
    outline: none;
`;

export const SearchWrapper = styled.div`
    display: block;
`;

export const SearchSection = styled.div`
    display: block;
    border-bottom: 1px solid #ccc;
    text-align: center; 
`;

export const SearchText = styled.div`
    color: #000000;
    font-size: 30px;
    font-weight: bold;
`;

export const SearchBox = styled.input`
    border: 1px solid ${brandColor};
    border-radius: 500px;
    font-size: 16px;
    margin: 20px;
    padding: 20px;
    width: 50%;
    outline: none;
`;
export const SearchButton = styled.button`
    color: ${brandColorWhite};
    background-color: ${brandColor};
    font-size: 16px;
    font-weight: bold;
    line-height: 1;
    border-radius: 500px;
    margin: 20px;
    padding: 20px;
    transition-duration: .3s;
    border-width: 0;
    letter-spacing: 2px;
    min-width: 160px;
    text-transform: uppercase;
    white-space: normal;
    text-decoration: none;
    &:hover {
        background-color: #08772f;
    }
    cursor: pointer;
    outline: none;
`;
 
export const ResultsSection = styled.div`
    display: block;
    border-bottom: 1px solid #060606;
`;
export const Songs = styled.div`
    display: block;
    border-bottom: 1px solid #060606;
    text-align: left;
    display: block;
    border-bottom: 1px solid #060606;
    text-align: left;
    max-height: 350px;
    overflow-y: auto;
`;
 
export const NoSongs = styled.div`
    display: block;
    text-align: center;
    padding: 20px;
`;
 
export const SongsList = styled.div`
    border-bottom: 1px solid #00000033;
    background: white;
    padding: 10px;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
    &:hover {
        opacity: 0.7;
    }
`;
 
export const SongTitle = styled.p`
    display: inline-block;
    padding: 10px;
    box-shadow:none;
    margin:0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 55%;
`;
 
export const SongAction = styled.button`
    color: ${brandColorWhite};
    background-color: ${brandColor};
    font-size: 10px;
    font-weight: bold;
    line-height: 1;
    border-radius: 500px;
    padding: 13px;
    border-width: 0;
    letter-spacing: 2px;
    white-space: normal;
    cursor: pointer;
    outline: none;
    margin-top: 3px;
    float: right;
    &:hover {
        background-color: #08772f;
    }
`;
 
// Modal css

export const ModalWrapper = styled.div`
    display: block;
`;

export const ModalHeading = styled.div`
    display: block;
    border-bottom: 1px solid #00000036;
    padding: 0 10px;
`;

export const ModalBody = styled.div`
    display: block;
    padding: 10px;
`;

export const ModalFooter = styled.div`
    display: block;
    // border-top: 1px solid #00000036;
    padding: 10px;
`;

export const FooterActions = styled.div`
    display: block;
`;

export const CloseModal = styled.button`
    color: ${brandColor};
    border: 1px solid ${brandColor};
    font-size: 10px;
    font-weight: bold;
    line-height: 1;
    border-radius: 500px;
    padding: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    white-space: normal;
    cursor: pointer;
    outline: none;
    &:hover {
        background-color: #08772f;
    }
`;

export const NewPlaylist = styled.button`
    color: ${brandColorWhite};
    background-color: ${brandColor};
    font-size: 10px;
    font-weight: bold;
    line-height: 1;
    border-radius: 500px;
    padding: 13px;
    border-width: 0;
    white-space: normal;
    cursor: pointer;
    outline: none;
    float: right;
    &:hover {
        background-color: #08772f;
    }
`;


export const NewPlaylistDiv = styled.div`
    border-top: 1px solid #ccc;
    margin: 10px 0;
    padding: 17px 0;
    text-align: center;
`;

export const NewPlaylistInput = styled.input`
    border: 1px solid ${brandColor};
    border-radius: 500px;
    font-size: 13px;
    width: 60%;
    outline: none;
    padding: 10px;
`;


export const NewPlaylistAction = styled.button`
    color: ${brandColorWhite};
    background-color: ${brandColor};
    font-size: 10px;
    font-weight: bold;
    line-height: 1;
    border-radius: 500px;
    padding: 13px;
    border-width: 0;
    white-space: normal;
    cursor: pointer;
    outline: none;
    margin-left: 15px;
    &:hover {
        background-color: #08772f;
    }
`;