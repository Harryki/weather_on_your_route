import React, { Component } from "react";
import Script from "react-load-script";
import {
  Container,
  Input,
  Button,
  CircularProgress,
  List,
  ListItem,
  IconButton,
  ListItemText,
  InputAdornment
} from "@material-ui/core";

import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import PlaceIcon from "@material-ui/icons/Place";
import ClearIcon from "@material-ui/icons/Clear";

import axios from "axios";

// components
import Header from "./components/Header";
const styles = {
  input: {
    marginBottom: 10,
    marginLeft: 5
  }
};

class App extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      origin: "",
      destination: "",
      origin_googled: false,
      dest_googled: false,
      isLoading: false,
      weathers: null
    };
    this.makeInputInvalid = this.makeInputInvalid.bind(this);
  }

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      // types: ["(cities)"]
    }; // To disable any eslint 'google not defined' errors

    // Initialize Google Autocomplete
    /*global google*/

    this.autocompleteOrigin = new google.maps.places.Autocomplete(
      document.getElementById("auto_origin"),
      options
    );

    this.autocompleteDestination = new google.maps.places.Autocomplete(
      document.getElementById("auto_destination"),
      options
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    this.autocompleteOrigin.setFields([
      "address_components",
      "formatted_address"
    ]);

    this.autocompleteDestination.setFields([
      "address_components",
      "formatted_address"
    ]);

    // Fire Event when a suggested name is selected
    this.autocompleteOrigin.addListener(
      "place_changed",
      this.handlePlaceSelect_origin
    );

    this.autocompleteDestination.addListener(
      "place_changed",
      this.handlePlaceSelect_destination
    );
  };

  handleInputChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.makeInputInvalid(name, value);
  };

  makeInputInvalid = (name, value) => {
    if (name === "origin") {
      this.setState({ [name]: value, origin_googled: false });
    } else if (name === "destination") {
      this.setState({ [name]: value, dest_googled: false });
    }
  };

  handlePlaceSelect_destination = () => {
    const addressObject = this.autocompleteDestination.getPlace();

    const address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState({
        destination: addressObject.formatted_address,
        dest_googled: true
      });
    }
  };

  handlePlaceSelect_origin = () => {
    // Extract City From Address Object

    const addressObject = this.autocompleteOrigin.getPlace();

    const address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState({
        origin: addressObject.formatted_address,
        origin_googled: true
      });
    }
  };

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      origin: this.state.origin.trim(),
      destination: this.state.destination.trim(),
      isLoading: true,
      weathers: null
    });

    const { origin, destination, origin_googled, dest_googled } = this.state;

    if (!origin_googled || !dest_googled) {
      // TODO: shake input and tell user what's wrong?
      this.setState({
        isLoading: false
      });
      console.log("can't submit");
      console.log(this.state);

      return;
    }

    axios
      .post(
        `https://us-central1-snow-alert-262619.cloudfunctions.net/snowAlert`,
        {
          origin,
          destination
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res.data);
        this.setState({ weathers: res.data, isLoading: false });
      });
  }

  handleClickClear = prop => e => {
    this.makeInputInvalid(prop, "");
  };

  render() {
    const { weathers, isLoading } = this.state;

    const endpoint = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_PLACES_API_KEY}&libraries=places`;
    let listItems = null;
    if (weathers !== null) {
      listItems = weathers.map((w, idx) => {
        let res = w.observations.location[0];
        return (
          <ListItem key={`${idx}` + w.feedCreation}>
            <ListItemText
              // metric, default is Celsius
              primary={`${res.observation[0].temperature}°C, ${res.observation[0].description}`}
              secondary={`${res.city}, ${res.state}, ${res.country}(${res.observation[0].latitude},${res.observation[0].longitude})`}
            />
          </ListItem>
        );
      });
    }
    return (
      <>
        <Container maxWidth="md">
          <Header title="Weather on your route"></Header>
          <Script url={endpoint} onLoad={this.handleScriptLoad} />
          <br />
          <form noValidate autoComplete="off">
            <div style={{ display: "flex" }}>
              <FiberManualRecordOutlinedIcon />
              <Input
                id="auto_origin"
                placeholder="origin"
                value={this.state.origin}
                name="origin"
                onChange={this.handleInputChange.bind(this)}
                style={styles.input}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      tabIndex={-1}
                      onClick={this.handleClickClear("origin").bind(this)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                }
              ></Input>
            </div>
            <div style={{ display: "flex" }}>
              <PlaceIcon />
              <Input
                id="auto_destination"
                placeholder="destination"
                value={this.state.destination}
                name="destination"
                onChange={this.handleInputChange.bind(this)}
                style={styles.input}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      tabIndex={-1}
                      onClick={this.handleClickClear("destination").bind(this)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                }
              ></Input>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit.bind(this)}
              disabled={isLoading}
            >
              get weathers on the route
            </Button>
            {isLoading && <CircularProgress size={24} />}
          </form>
          <div>
            <List dense={false}>{listItems}</List>
          </div>
        </Container>
      </>
    );
  }
}

export default App;
