import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");

/**
 * How to use :
 * <ButtonRadio
 *  flexDirectionRow = boolean
 *  items = array[{label: string}]
 *  onPress = function (required)
 *  index = number
 * />
 */


export default function ButtonRadio(props) {

    return (
        <View style={props.flexDirectionRow ? styles.containerRow : styles.containerCol}>
            {props.items.map((item, index) => (
                <View style={styles.item} key={index}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => props.onPress(index)}
                    >
                        <View
                            style={props.index === index ? styles.checked : styles.unchecked}
                        >
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.label}>{item.label}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    containerCol: {
        width: "100%",
    },
    containerRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 12,
    },
    button: {
        width: width * .08,
        height: width * .08,
        borderColor: "#203455",
        borderWidth: 2,
        borderRadius: 50,
        marginRight: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    checked: {
        display: "flex",
        width: width * .04,
        height: width * .04,
        borderRadius: 50,
        backgroundColor: "#203455",
    },
    unchecked: {
        display: "none",
    },
    label: {
        fontFamily: "openSans",
        fontSize: width > 500 ? 22 : 18,
        color: "#242424",
        flexShrink: 1,
    },
    display: {
        alignItems: "center",
        justifyContent: "center",
    },
    noDisplay: {
        display: "none",
    }
})