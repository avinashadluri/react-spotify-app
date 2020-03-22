import React from "react";
import * as Styles from "./Styles";

class Header extends React.Component {
    render() {
      return (
        <Styles.HeaderWrapper>
          <Styles.HeaderText>Spotify App</Styles.HeaderText>
        </Styles.HeaderWrapper>
      );
    }
}

export default Header;