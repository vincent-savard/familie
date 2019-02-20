import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import { createStore } from "redux";
import devToolsEnhancer from "remote-redux-devtools";
import { Provider } from "react-redux";
import { MapView } from "expo";
import Login from "./components/login";
import Signup from "./components/signup";
import rootReducer from "./reducers";
import AppNavigator from "./navigation/AppNavigator";
import Map from "./components/map/index";
import getTheme from "./native-base-theme/components";
import custom from "./native-base-theme/variables/custom";
import { StyleProvider } from "native-base";
import { StyledHeader } from "./components/mainHeader/header";
import { StyledFooter } from "./StyledComponents/footer";

let store = createStore(rootReducer, devToolsEnhancer());

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  async UNSAFE_componentWillMount() {
    await Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <StyleProvider style={getTheme(custom)}>
          <Provider store={store}>
            <View style={styles.container}>
              {Platform.OS === "ios" && <StyledHeader />}
              <AppNavigator />
            </View>
          </Provider>
        </StyleProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
