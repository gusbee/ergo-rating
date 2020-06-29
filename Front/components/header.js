import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";

const { width, height } = Dimensions.get("screen");

/**
 * 
 * THow to use :
 * <Header 
 *  title: "Header's title"
 *  canback={boolean}
 *  canSignOut={boolean}
 *  navigation={this.props.navigation} 
 * />
 */
export default function Header(props) {
    return (
        <View style={styles.header}>

            <TouchableOpacity
                style={props.canBack ? styles.sideButtons : { opacity: 0 }}
                disabled={!props.canBack}
                onPress={() => props.navigation.goBack()}
            >
                <Image
                    source={require("../images/back.png")}
                    style={styles.back}
                />
            </TouchableOpacity>

            <Text style = {styles.headerText}>
                {props.title}
            </Text>

            <TouchableOpacity
                style={props.canSignOut ? styles.sideButtons : { opacity: 0 }}
                disabled={!props.canSignOut}
                onPress={() => props.navigation.navigate("SignIn")}
            >
                <Image
                    source={require("../images/signout.png")}
                    style={styles.signOut}
                />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: width,
        height: height / 10,
        minHeight: 72,
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
        fontSize: width > 500 ? 25 : 20,
        color: "#FFFFFF",
        textAlign: "center",
    },
    sideButtons: {
        width: 48,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    back: {
        width: 24,
        height: 12,
    },
    signOut: {
        width: 24,
        height: 24,
    }
})