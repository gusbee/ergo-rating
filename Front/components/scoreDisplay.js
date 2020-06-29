import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";

/**
 * 
 * @param {*} props
 * label="string" ,
 * score={number}
 */

const { width, height } = Dimensions.get("window");

export default function ScoreDisplay(props) {
    return (
        <View style={styles.container}>

            <Text style={styles.label}>{props.label}</Text>

            <View style={styles.scoreContainer}>
                <Text style={styles.score}>{props.score}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        maxWidth: 500,
        height: height / 10,
        borderRadius: 12,
        paddingHorizontal: "5%",
        marginVertical: 12,
        alignItems: "center",
        backgroundColor: "#203455",
        flexDirection: "row",
    },
    label: {
        flex: 8,
        fontFamily: "openSans",
        fontSize: width > 500 ? 25 : 20,
        color: "#FFFFFF",
    },
    scoreContainer: {
        flex: 3,
        height: "60%",
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },
    score: {
        fontFamily: "openSans",
        fontSize: width > 500 ? 25 : 20,
        color: "#242424",
    }
})