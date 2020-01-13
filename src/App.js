import React, { Component } from "react";
import { debounce } from "throttle-debounce";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import Header from "./components/Header";

const useStyles = makeStyles(theme => ({
  // root: {
  //   "& > *": {
  //     margin: theme.spacing(1),
  //     width: 200
  //   }
  // }
}));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "",
      destination: "",
      origin_gps: null,
      destination_gps: null,
      isLoaded: false,
      error: null,
      predictions: null
    };
    this.autocompleteDebounced = debounce(500, this.autocomplete);
  }

  handleSubmit(e) {
    this.setState({
      origin: this.state.origin.trim(),
      destination: this.state.destination.trim()
    });

    if (this.state.origin.length === 0 || this.state.destination.length === 0) {
      console.log("empty field on submit");
      return;
    }

    alert(
      "origin:" + this.state.origin + ", destintation:" + this.state.destination
    );
    e.preventDefault();
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value }, () => {
      this.autocompleteDebounced(this.state[name]);
    });
  };

  autocomplete = location => {
    console.log("you've requested location: " + location);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&key=${process.env.REACT_APP_PLACES_API_KEY}`
      )
      .then(res => {
        const predictions = res.data;
        this.setState({ predictions });
      });
  };

  render() {
    return (
      <>
        <Header title="Weather on your route"></Header>
        <br />
        <form className={useStyles.root} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="origin"
            name="origin"
            onChange={this.handleInputChange.bind(this)}
          />
          <TextField
            id="standard-basic"
            label="destination"
            name="destination"
            onChange={this.handleInputChange.bind(this)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit.bind(this)}
          >
            get weathers on the route
          </Button>
        </form>
      </>
    );
  }
}
