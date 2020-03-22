import React from "react";
import * as Styles from "./Styles";

class Loader extends React.Component {
    render() {
      return (
        <Styles.Loader>
          <Styles.LoaderText>Loading...</Styles.LoaderText>
        </Styles.Loader>
      );
    }
}

export default Loader;