import React from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

/**
 * How to use :
 * <CheckBox 
 * label="string"
 * checked={function}
 * unchecked={function}
 * value={optionnal}
 * />
 */

const { width } = Dimensions.get("window");

export default class CheckBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }

    handleChecked = () => {
        if (this.state.checked) {
            this.setState({ checked: false })
            this.props.unchecked(this.props.value);
        } else {
            this.setState({ checked: true })
            this.props.checked(this.props.value);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.checkBox}
                    onPress={this.handleChecked}
                >
                    <Image
                        style={this.state.checked ? styles.image : styles.noImage}
                        source={require("../images/checked-blue.png")}
                    />
                </TouchableOpacity>
                <Text style={styles.text}>{this.props.label}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 12,
    },
    checkBox: {
        width: width * .08,
        height: width * .08,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#203455",
        borderWidth: 2,
        borderRadius: 12,
        marginRight: 12,
    },
    image: {
        width: width * .07,
        height: width * .07,
    },
    noImage: {
        width: 30,
        height: 30,
        display: "none",
    },
    text: {
        fontFamily: "openSans",
        fontSize: width > 500 ? 22 : 20,
        color: "#242424",
        flexShrink: 1,
    }
})