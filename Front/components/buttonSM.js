import React from "react";
import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";

/**
 * 
 * @param {*} props 
 * onPress: function
 * title: string
 * disabled: boolean
 */

const { width, height } = Dimensions.get("window");

export default function ButtonSM(props) {
    return (
        <TouchableOpacity
        style={props.disabled ? styles.buttonDisabled : styles.button}
        onPress={props.onPress}
        disabled={props.disabled}>
            
            <Text
                style={props.disabled ? styles.buttonTextDisabled : styles.buttonText}>
                
                {props.title}
                 
            </Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        maxWidth: 500,
        height: height / 20,
        minHeight: 48,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#203455",
        marginVertical: 12,
        borderRadius: 12,
    },
    buttonText: {
        fontFamily: "openSans",
        fontSize: width > 500 ? 22 : 20,
        color: "#FFFFFF"
    },
    buttonDisabled: {
        width: "100%",
        maxWidth: 500,
        height: height / 20,
        minHeight: 48,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#404040",
        marginVertical: 12,
        borderRadius: 12,
    },
    buttonTextDisabled: {
        fontFamily: "openSans",
        fontSize: width > 500 ? 22 : 20,
        color: "#979797"
    },
})