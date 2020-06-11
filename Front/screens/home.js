import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Image } from "react-native";
import Header from "../components/header";

const { width } = Dimensions.get("screen");


export default class Home extends React.Component{
    render() {
        return (
            <View style = {styles.container}>
                <Header
                    title="ErgoRating"
                    canBack={false}
                    canSignOut={true}
                />

                <View style = {styles.buttons}>
                    <TouchableOpacity
                        style = {styles.button}
                    >
                        <Text style={styles.buttonText}>Rapid</Text>
                        <Text style={styles.buttonText}>Upper</Text>
                        <Text style={styles.buttonText}>Limb</Text>
                        <Text style = {styles.buttonText}>Assessment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {styles.button}
                    >
                        <Text style={styles.buttonText}>Rapid</Text>
                        <Text style={styles.buttonText}>Entire</Text>
                        <Text style={styles.buttonText}>Body</Text>
                        <Text style = {styles.buttonText}>Assessment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {styles.button}
                    >
                        <Image
                            source={require("../images/graph.png")}
                            style = {styles.image}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {styles.button}
                    >
                        <Image
                            source={require("../images/settings.png")}
                            style = {styles.image}
                        />
                    </TouchableOpacity>     
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
    },
    buttons: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
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