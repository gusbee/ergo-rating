import React from "react";
import { Provider } from "react-redux";
import Store from "./store/configureStore";
import { View, StatusBar } from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./screens/signIn";
import SignUp from "./screens/signUp";
import Home from "./screens/home";
import Data from "./screens/data";
import RulaStart from "./screens/rula/rulaStart";
import RulaArmPosition from "./screens/rula/rulaArmPosition";
import RulaArmAdjustment from "./screens/rula/rulaArmAdjustment";
import RulaElbowPosition from "./screens/rula/rulaElbowPosition";
import RulaWristPosition from "./screens/rula/rulaWristPosition";
import RulaWristTorsion from "./screens/rula/rulaWristTorsion";
import RulaActivityPartOne from "./screens/rula/rulaActivityPartOne";
import RulaActivityPartTwo from "./screens/rula/rulaActivityPartTwo";
import RulaNeckPosition from "./screens/rula/rulaNeckPosition";
import RulaTrunkPosition from "./screens/rula/rulaTrunkPosition";
import RulaLegsPosition from "./screens/rula/rulaLegsPosition";
import RulaFinalScore from "./screens/rula/rulaFinalScore";
import RulaComment from "./screens/rula/rulaComment";
import SplashScreen from "./screens/splash";
import { AppLoading } from "expo";
import ObservationsList from "./screens/observationsList";
import ObservationDetails from "./screens/observationDetails";
import Settings from "./screens/settings";
import RulaObservedEmployeesList from "./screens/rula/rulaObservedEmployeesList";


let customFonts = {
  "openSans": require("./assets/fonts/OpenSans-Regular.ttf"),
  "sourceSansProLight": require("./assets/fonts/SourceSansPro-Light.ttf"),
  "ubuntuMonoBold": require("./assets/fonts/UbuntuMono-Bold.ttf")
};

const Stack = createStackNavigator()

export default class App extends React.Component {

  state = {
    fontsLoaded: false,
    // hideSplash: false,
  }



  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    // if (this.state.fontsLoaded && this.state.hideSplash) {
    if (this.state.fontsLoaded) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar hidden={true} />
          <Provider store={Store}>
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

                <Stack.Screen
                  name="Data"
                  component={Data}
                />

                <Stack.Screen
                  name="ObservationsList"
                  component={ObservationsList}
                />

                <Stack.Screen
                  name="ObservationDetails"
                  component={ObservationDetails}
                />

                <Stack.Screen
                  name="RulaObservedEmployeesList"
                  component={RulaObservedEmployeesList}
                />

                <Stack.Screen
                  name="RulaStart"
                  component={RulaStart}
                />

                <Stack.Screen
                  name="RulaArmPosition"
                  component={RulaArmPosition}
                />

                <Stack.Screen
                  name="RulaArmAdjustment"
                  component={RulaArmAdjustment}
                />

                <Stack.Screen
                  name="RulaElbowPosition"
                  component={RulaElbowPosition}
                />

                <Stack.Screen
                  name="RulaWristPosition"
                  component={RulaWristPosition}
                />

                <Stack.Screen
                  name="RulaWristTorsion"
                  component={RulaWristTorsion}
                />

                <Stack.Screen
                  name="RulaActivityPartOne"
                  component={RulaActivityPartOne}
                />

                <Stack.Screen
                  name="RulaNeckPosition"
                  component={RulaNeckPosition}
                />

                <Stack.Screen
                  name="RulaTrunkPosition"
                  component={RulaTrunkPosition}
                />

                <Stack.Screen
                  name="RulaLegsPosition"
                  component={RulaLegsPosition}
                />
                

                <Stack.Screen
                  name="RulaActivityPartTwo"
                  component={RulaActivityPartTwo}
                />

                <Stack.Screen
                  name="RulaFinalScore"
                  component={RulaFinalScore}
                />

                <Stack.Screen
                  name="RulaComment"
                  component={RulaComment}
                />

                <Stack.Screen
                  name="Settings"
                  component={Settings}
                />

              </Stack.Navigator>
            </NavigationContainer>
          </Provider>
        </View>
      ); 
    // } else if(this.state.fontsLoaded && !this.state.hideSplash){
    //   setTimeout(() => {
    //     this.setState({hideSplash: true});
    //   }, 3000);;
    //   return (
    //     <SplashScreen />
    //   )
    // } else if (!this.state.fontsLoaded && !this.state.hideSplash) {
    } else {
      return <AppLoading />
    }
  }
}