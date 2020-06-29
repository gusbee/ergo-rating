import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    View,
    Image
} from "react-native";

const { width } = Dimensions.get("window");

/**
 * 
 * @param {*} props
 * source: require("") 
 * onPress: function
 * index: number
 * currentIndex: number
 */

export default function ButtonXL(props) {
    
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress}
        >
            <Text style={styles.text}>{props.source}</Text>
            <View style={props.index === props.currentIndex &&
                props.index !== undefined ?
            (
                styles.checked
            ) : (
                {display: "none"}        
            )}>
                <Image
                    source={require("../images/checked.png")}
                    style={styles.checkedImage}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: width / 3,
        height: width / 3,
        backgroundColor: "#203455",
        margin: 12,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },
    image: {
        width: width / 3 - 30,
        height: width / 3 - 30,
    },
    text: {
        fontFamily: "openSans",
        fontSize: 25,
        color: "#FFFFFF",
        flexShrink: 1
    },
    checked: {
        width: "20%",
        height: "20%",
        backgroundColor: "#203455",
        borderWidth: 3,
        borderColor: "#FFFFFF",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
    },
    checkedImage: {
        width: "80%",
        height: "80%",
    }
})