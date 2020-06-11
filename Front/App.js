import React from "react";
import { View, StatusBar } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from 'expo';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./screens/signIn";
import SignUp from "./screens/signUp";
import Home from "./screens/home";

let customFonts = {
  "openSans": require("./assets/fonts/OpenSans-Regular.ttf"),
  "sourceSansProLight": require("./assets/fonts/SourceSansPro-Light.ttf"),
  "ubuntuMonoBold": require("./assets/fonts/UbuntuMono-Bold.ttf")
};

const Stack = createStackNavigator();

export default class App extends React.Component {

  state = {
    fontsLoaded: false,
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar hidden={true} />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="SignIn"
              headerMode="none">
              
              <Stack.Screen
                name = "SignIn"
                component = {SignIn}
              />
              <Stack.Screen
                name = "SignUp"
                component = {SignUp}
              />

              <Stack.Screen
                name="Home"
                component = {Home}
              />

            </Stack.Navigator>
          </NavigationContainer>
        </View>
      ); 
    } else {
      return (
        <AppLoading />
      )
    }
  }
}