import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

/**
 * 
 * @param {*} props 
 * onPress: function
 * title: string
 * disabled: boolean
 */

export default function Button(props) {

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
        width: 300,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#203455",
        marginVertical: 12,
    },
    buttonText: {
        fontFamily: "openSans",
        fontSize: 15,
        color: "#FFFFFF"
    },
    buttonDisabled: {
        width: 300,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#404040",
        marginVertical: 12,
    },
    buttonTextDisabled: {
        fontFamily: "openSans",
        fontSize: 15,
        color: "#979797"
    },
})