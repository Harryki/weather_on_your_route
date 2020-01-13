import React, { Component } from "react";
import Script from "react-load-script";
import {
  TextField,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import axios from "axios";

// components
import Header from "./components/Header";
const styles = {
  // button: {
  //   background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  //   borderRadius: 3,
  //   border: 0,
  //   color: "white",
  //   height: 48,
  //   padding: "0 30px",
  //   boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  // },
  // buttonBlue: {
  //   background: "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
  //   boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .30)"
  // }
  input: {
    width: 400,
    marginBottom: 10
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

  render() {
    const { weathers, isLoading } = this.state;
    const { classes } = this.props;

    const endpoint = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_PLACES_API_KEY}&libraries=places`;
    let listItems = null;
    if (weathers !== null) {
      listItems = weathers.map((w, idx) => {
        let res = w.observations.location[0];
        return (
          <ListItem key={`${idx}` + w.feedCreation}>
            <ListItemText
              // metric, default is Celsius
              primary={`°C ${res.observation[0].temperature} ${res.observation[0].description}`}
              secondary={`${res.city}, ${res.state}, ${res.country}(${res.observation[0].latitude},${res.observation[0].longitude})`}
            />
          </ListItem>
        );
      });
    }
    return (
      <>
        <Header title="Weather on your route"></Header>
        <Script url={endpoint} onLoad={this.handleScriptLoad} />
        <br />
        <form noValidate autoComplete="off">
          <TextField
            id="auto_origin"
            placeholder="origin"
            value={this.state.origin}
            name="origin"
            onChange={this.handleInputChange.bind(this)}
            style={styles.input}
          ></TextField>
          <br />
          <TextField
            id="auto_destination"
            placeholder="destination"
            value={this.state.destination}
            name="destination"
            onChange={this.handleInputChange.bind(this)}
            style={styles.input}
          ></TextField>
          <br />
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
      </>
    );
  }
}

export default App;
