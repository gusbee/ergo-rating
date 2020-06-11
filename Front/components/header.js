import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

/**
 * 
 * @param {*} props
 * title: string
 * canback: boolean
 * canSignOut: boolean
 * navigation: navigation props 
 */
export default function Header(props) {

    return (
        <View style={styles.header}>
            
            <TouchableOpacity
                style={props.canBack ? { display: "flex" } : { display: "none" }}
                onPress={() => props.navigation.goBack()}
            >
                <Text style = {styles.headerText}>back</Text>
            </TouchableOpacity>

            <Text style = {styles.headerText}>
                {props.title}
            </Text>

            <TouchableOpacity style={props.canSignOut ? {display: "flex"} : {display: "none"}}>
                <Text style = {styles.headerText}>out</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 72,
        paddingHorizontal: 16,
        backgroundColor: "#203455",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
    },
    headerText: {
        fontFamily: "openSans",
        fontSize: 20,
        color: "#FFFFFF",
        textAlign: "center",
    }
})