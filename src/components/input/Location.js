import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

class Location extends Component {
  render() {
    return <TextField id="standard-basic" label={this.props.label} />;
  }
}

export default Location;
