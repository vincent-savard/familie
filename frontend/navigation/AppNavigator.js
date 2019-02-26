import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import addEventForm from "../components/addEventForm/addEventForm";
import signup from "../components/signup";
import login from "../components/login";
import HostingScreen from "../screens/HostingScreen";
import LoginScreen from "../screens/LoginScreen";
import CreateProfile from "../components/createProfile";
import { View, Text, Image } from "native-base";
import { fetchUrl } from "../fetchUrl";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import moment from "moment";
import AttendingScreen from "../screens/AttendingScreen";
import createProfileAddFamily from "../components/createProfileAddFamily";
// import console = require("console");

/*************Not supposed to be here - need proper navigation *******/

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.navigation.getParam("id", null),
      event: {}
    };
    fetch(`${fetchUrl}/event/${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        // console.log("what do I receive", res);
        this.setState({ event: res.result });
      });
  }

  render() {
    console.log("dans le render de event");
    return (
      <View>
        <Text>
          {/**Image */}
          {/* {this.state.event.guests} will need an endpoint that will give the user depending on his id, map every id to show every attending guests*/}
          {this.state.event.name}
          {this.state.event.desc}
          {this.state.event.location}
          {moment(this.state.event.time).format("MMM Do YYYY, h:mm a")}
        </Text>
      </View>
    );
  }
}

/******************** As I said, proper navigation **********/

/************* Same here, I'm just being lazy *******/

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.navigation.getParam("id", null),
      profile: {}
    };
    fetch(`${fetchUrl}/profile/${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        console.log("what do I receive", res);
        this.setState({ profile: res.result });
      });
  }

  render() {
    console.log("dans le render de profile");
    return (
      <View>
        {console.log(this.state.profile)}
        <View>
          <Text>{this.state.profile.firstName}</Text>
        </View>
        <View>
          <Text>{this.state.profile.lastName}</Text>
        </View>
        <Image uri="http://68.183.200.44:4000/8c191ac9b6154ff94e69a9ccc874fa63.jpg}" />
      </View>
    );
  }
}

/******************** As I said, proper navigation **************/

const AuthenticationNavigator = createStackNavigator({
  AuthLoadingScreen: AuthLoadingScreen,
  LoginScreen: LoginScreen,
  SignupScreen: signup
});

const CreateAccount = createStackNavigator({
  CreateProfileStep1: CreateProfile,
  CreateFamily: createProfileAddFamily
});

const AppNavigator = createStackNavigator({
  HostingEvent: HostingScreen,
  AttendingEvent: AttendingScreen,
  AddEvent: addEventForm,
  Login: login,
  // CreateProfile: CreateProfile
  Event,
  MyProfile
});

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Authenticated: AuthenticationNavigator,
      Profile: CreateAccount,
      Main: MainTabNavigator,
      AppNavigator
    },
    {
      initialRouteName: "Authenticated"
    }
  )
);
