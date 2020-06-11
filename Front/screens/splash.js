import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function Splash() {
    
    return (
        <View style = {styles.container}>
            <Text style = {styles.topText}>ergo</Text>
            <Text style = {styles.bottomText}>rating</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#203455",
    },
    topText: {
        fontFamily: "ubuntuMonoBold",
        fontSize: 70,
        color: "#FFFFFF",
        textTransform: "uppercase",
    },
    bottomText: {
        fontFamily: "sourceSansProLight",
        fontSize: 40,
        color: "#FFFFFF",
        textTransform: "uppercase",
    }
})