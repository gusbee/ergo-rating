import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Header from "../components/header";
import ButtonXL from "../components/buttonXL";
import globalStyle from "../globalStyle";

const { width } = Dimensions.get("screen");

export default class Home extends React.Component{

    goTo = (screenName) => {
        this.props.navigation.navigate(screenName);
    }

    render() {
        return (
            <View style = {globalStyle.container}>
                <Header
                    title="ErgoRating"
                    canBack={false}
                    canSignOut={true}
                    navigation={this.props.navigation}
                />

                <View style={globalStyle.wrapper}>

                    <View style = {styles.buttons}>

                        <ButtonXL
                            source="Méthode RULA"
                            onPress={() => this.goTo("RulaObservedEmployeesList")}
                        />

                        <ButtonXL
                            source="Méthode REBA"
                        />

                        <ButtonXL
                            source="Données & Stats"
                            onPress={() => this.goTo("Data")}
                        />

                        <ButtonXL
                            source="Paramètres"
                            onPress={() => this.goTo("Settings")}
                        />    

                    </View>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    buttons: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignContent: "center",
    },
    button: {
        width: width / 3,
        height: width / 3,
        backgroundColor: "#203455",
        justifyContent: "center",
        alignItems: "center",
        padding: 6,
        margin: 12,
    },
    buttonText: {
        fontFamily: "openSans",
        fontSize: 22,
        color: "#FFFFFF"
    },
    image: {
        width: width / 3 - 30,
        height: width / 3 - 30,
    }
})